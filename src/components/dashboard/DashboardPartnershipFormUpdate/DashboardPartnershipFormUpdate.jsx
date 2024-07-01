"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardPartnershipUpdateSchema } from "@/yupSchemas/dashboardPartnershipUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from "../DashboardComponents.module.scss";


const DashboardPartnershipFormUpdate = ({ data, mutate }) => {
    const { slug, title, titleEn, isMainPartner, logo, siteLink, isApproved } = data;

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newTitle: title,
            newTitleEn: titleEn,
            newIsMainPartner: isMainPartner,
            newLogo: logo,
            newSiteLink: siteLink,
            newIsApproved: isApproved,
        },
        resolver: yupResolver(dashboardPartnershipUpdateSchema),
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

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
        } = data;

        const updatedData = {
            slug: newSlug,
            title: newTitle,
            titleEn: newTitleEn,
            isMainPartner: newIsMainPartner,
            logo: newLogo,
            siteLink: newSiteLink,
            isApproved: newIsApproved,
        };

        const session = await getDashboardSession();
        const editor = session.user?.email;
        console.log('editor', editor)

        try {
            await fetch(`/api/partnership/${slug}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
            });

            console.log("Information updated to DB");

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== updatedData.slug) ? router.push(`/dashboard/partnership/${updatedData.slug}`) : mutate();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className={styles.dataFormContainer}>
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
                        onUpload={(result, widget) => {
                            if (getValues("newLogo") !== "") {
                                const publicId = getValues("newLogo");
                                handleDeleteImgFromCloudinary(publicId);
                            }
                            setValue("newLogo", result.info.public_id, {
                                shouldValidate: true,
                            });
                            widget.close();
                        }}
                        options={{ multiple: false }}
                        uploadPreset='unsigned_preset'
                    >
                        Оновити логотип (WEBP)
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

                <div className={styles.checkboxInputGroup}>
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
                </div>

                <button
                    type='submit'
                    className={styles.submitBtn}
                    disabled={isErrors || isSubmitting}
                >Оновити інформацію</button>
            </form>
        </div>
    );
}

export default DashboardPartnershipFormUpdate