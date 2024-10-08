"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardPartnershipCreateSchema } from "@/yupSchemas/dashboardPartnershipCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss';


const DashboardPartnershipFormCreate = ({ mutate, isOwner, slugsArr }) => {
    const initialValues = {
        defaultValues: {
            slug: "",
            title: "",
            titleEn: "",
            isMainPartner: false,
            logo: "",
            siteLink: "",
            isApproved: false,
        },
        resolver: yupResolver(dashboardPartnershipCreateSchema),
        context: slugsArr,
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        const forSendData = { ...data };
        const session = await getDashboardSession();
        const editor = session.user?.name;
        forSendData.editor = editor;
        const trimedSlug = forSendData.slug.trim();
        forSendData.slug = trimedSlug;


        try {
            await fetch("/api/partnership", {
                method: "POST",
                body: JSON.stringify(forSendData),
            });
            // автоматично оновлює сторінку при зміні кількості карток
            mutate();

            toast.success(`Картка партнера "${forSendData.slug}" створена!`);

        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.dataForm}
            noValidate
        >
            <h3 className={styles.formTitle}>
                Створення картки партнера
            </h3>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='slug'
                    placeholder=' '
                    {...register("slug")}
                />
                <label htmlFor='slug' className={styles.formLabel}>
                    Slug
                </label>
                <p className={styles.error}>{errors.slug?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='title'
                    placeholder=' '
                    {...register("title")}
                />
                <label htmlFor='title' className={styles.formLabel}>
                    Заголовок
                </label>
                <p className={styles.error}>{errors.title?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='titleEn'
                    placeholder=' '
                    {...register("titleEn")}
                />
                <label htmlFor='titleEn' className={styles.formLabel}>
                    Заголовок англійською
                </label>
                <p className={styles.error}>{errors.titleEn?.message}</p>
            </div>

            <div className={styles.checkboxInputGroup}>
                <label htmlFor='isMainPartner' className={styles.checkboxLabel}>
                    Головний партнер
                </label>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    id='isMainPartner'
                    placeholder=' '
                    {...register("isMainPartner")}
                />
                <p className={styles.error}>{errors.isMainPartner?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <CldUploadButton
                    name='logo'
                    className={styles.uploadBtn}
                    onSuccess={(result, widget) => {
                        if (getValues("logo") !== "") {
                            const publicId = getValues("logo");
                            handleDeleteImgFromCloudinary(publicId);
                            toast.success("Попереднє фото видалено з Cloudinary!");
                        }
                        setValue("logo", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                        toast.success("Нове фото додано до Cloudinary!");
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Додати логотип (WEBP) (min 370*230)
                </CldUploadButton>

                <p className={styles.error}>{errors.logo?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='siteLink'
                    placeholder=' '
                    {...register("siteLink")}
                />
                <label htmlFor='siteLink' className={styles.formLabel}>
                    Посилання на ресурс
                </label>
                <p className={styles.error}>{errors.siteLink?.message}</p>
            </div>

            {isOwner && <div className={styles.checkboxInputGroup}>
                <label htmlFor='isApproved' className={styles.checkboxLabel}>
                    Розміщення на сайті
                </label>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    id='isApproved'
                    placeholder=' '
                    {...register("isApproved")}
                />
                <p className={styles.error}>{errors.isApproved?.message}</p>
            </div>}

            <button
                type='submit'
                className={styles.submitBtn}
                disabled={isErrors || isSubmitting}
            >
                Зберегти інформацію
            </button>
        </form>
    );
}

export default DashboardPartnershipFormCreate