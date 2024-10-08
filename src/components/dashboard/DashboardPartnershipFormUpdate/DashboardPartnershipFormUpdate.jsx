"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardPartnershipUpdateSchema } from "@/yupSchemas/dashboardPartnershipUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import { isDeepEqual } from "@/utils/isDeepEqual";
import styles from "../DashboardComponents.module.scss";


const DashboardPartnershipFormUpdate = ({ data, mutate, isOwner, slugsArr }) => {
    const { slug, title, titleEn, isMainPartner, logo, siteLink, isApproved, editor } = data;

    const receivedData = { slug, title, titleEn, isMainPartner, logo, siteLink, isApproved, editor }

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newTitle: title,
            newTitleEn: titleEn,
            newIsMainPartner: isMainPartner,
            newLogo: logo,
            newSiteLink: siteLink,
            newIsApproved: isApproved,
            newEditor: editor,
        },
        resolver: yupResolver(dashboardPartnershipUpdateSchema),
        context: slugsArr,
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isErrors, isSubmitting } = formState;

    const router = useRouter();


    const onSubmit = async (data) => {
        const {
            newSlug,
            newTitle,
            newTitleEn,
            newIsMainPartner,
            newLogo,
            newSiteLink,
            newIsApproved,
            newEditor,
        } = data;

        const updatedData = {
            slug: newSlug,
            title: newTitle,
            titleEn: newTitleEn,
            isMainPartner: newIsMainPartner,
            logo: newLogo,
            siteLink: newSiteLink,
            isApproved: newIsApproved,
            editor: newEditor,
        };

        const trimedSlug = updatedData.slug.trim();
        updatedData.slug = trimedSlug;

        if (isDeepEqual(receivedData, updatedData)) {
            toast.warn(`Ви не внесли змін в картку "${slug}"`);
            return;
        }

        const forSendData = { ...updatedData };
        const session = await getDashboardSession();
        const editor = session.user?.name;
        forSendData.editor = editor;

        try {
            await fetch(`/api/partnership/${slug}`, {
                method: "PUT",
                body: JSON.stringify(forSendData),
            });

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== forSendData.slug) ? router.push(`/dashboard/partnership/${forSendData.slug}`) : mutate();

            toast.success(`Картка партнера "${forSendData.slug}" оновлена!`);

        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.dataForm}
            noValidate
        >
            <h3 className={styles.formTitle}>Редагування картки партнера</h3>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newSlug'
                    placeholder=' '
                    {...register("newSlug")}
                />
                <label htmlFor='newSlug' className={styles.formLabel}>
                    New Slug
                </label>
                <p className={styles.error}>{errors.newSlug?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newTitle'
                    placeholder=' '
                    {...register("newTitle")}
                />
                <label htmlFor='newTitle' className={styles.formLabel}>
                    Новий заголовок
                </label>
                <p className={styles.error}>{errors.newTitle?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newTitleEn'
                    placeholder=' '
                    {...register("newTitleEn")}
                />
                <label htmlFor='newTitleEn' className={styles.formLabel}>
                    Новий заголовок англійською
                </label>
                <p className={styles.error}>{errors.newTitleEn?.message}</p>
            </div>

            <div className={styles.checkboxInputGroup}>
                <label htmlFor='newIsMainPartner' className={styles.checkboxLabel}>
                    Головний партнер
                </label>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    id='newIsMainPartner'
                    placeholder=' '
                    {...register("newIsMainPartner")}
                />
                <p className={styles.error}>{errors.newIsMainPartner?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <CldUploadButton
                    name='newLogo'
                    className={styles.uploadBtn}
                    onSuccess={(result, widget) => {
                        if (getValues("newLogo") !== "") {
                            const publicId = getValues("newLogo");
                            handleDeleteImgFromCloudinary(publicId);
                            toast.success("Попереднє фото видалено з Cloudinary!");
                        }
                        setValue("newLogo", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                        toast.success("Нове фото додано до Cloudinary!");
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Оновити логотип (WEBP) (min 370*230)
                </CldUploadButton>

                <p className={styles.error}>{errors.newLogo?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newSiteLink'
                    placeholder=' '
                    {...register("newSiteLink")}
                />
                <label htmlFor='newSiteLink' className={styles.formLabel}>
                    Нове посилання на ресурс
                </label>
                <p className={styles.error}>
                    {errors.newSiteLink?.message}
                </p>
            </div>

            {isOwner && <div className={styles.checkboxInputGroup}>
                <label htmlFor='newIsApproved' className={styles.checkboxLabel}>
                    Розміщення на сайті
                </label>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    id='newIsApproved'
                    placeholder=' '
                    {...register("newIsApproved")}
                />
                <p className={styles.error}>{errors.newIsApproved?.message}</p>
            </div>}

            <button
                type='submit'
                className={styles.submitBtn}
                disabled={isErrors || isSubmitting}
            >Оновити інформацію</button>
        </form>
    );
}

export default DashboardPartnershipFormUpdate