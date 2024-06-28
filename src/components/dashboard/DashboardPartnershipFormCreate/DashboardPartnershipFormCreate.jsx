"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardPartnershipCreateSchema } from "@/yupSchemas/dashboardPartnershipCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardPartnershipFormCreate = ({ mutate }) => {
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
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        const session = await getDashboardSession();
        const editor = session.user?.email;
        console.log('editor', editor)
        try {
            await fetch("/api/partnership", {
                method: "POST",
                body: JSON.stringify(data),
            });
            // автоматично оновлює сторінку при зміні кількості карток
            mutate();
            console.log("Information added to DB");

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
                        Title
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
                        TitleEn
                    </label>
                    <p className={styles.error}>{errors.titleEn?.message}</p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='checkbox'
                        className={styles.formInput}
                        id='isMainPartner'
                        placeholder=' '
                        {...register("isMainPartner")}
                    />
                    <label htmlFor='isMainPartner' className={styles.formLabel}>
                        IsMainPartner
                    </label>
                    <p className={styles.error}>{errors.isMainPartner?.message}</p>
                </div>

                <div className={styles.inputGroup}>
                    <CldUploadButton
                        name='logo'
                        className={styles.uploadBtn}
                        onUpload={(result, widget) => {
                            if (getValues("phologoto") !== "") {
                                const publicId = getValues("logo");
                                handleDeleteImgFromCloudinary(publicId);
                            }
                            setValue("logo", result.info.public_id, {
                                shouldValidate: true,
                            });
                            widget.close();
                        }}
                        options={{ multiple: false }}
                        uploadPreset='unsigned_preset'
                    >
                        Додати логотип (WEBP)
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
                        SiteLink
                    </label>
                    <p className={styles.error}>{errors.siteLink?.message}</p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='checkbox'
                        className={styles.formInput}
                        id='isApproved'
                        placeholder=' '
                        {...register("isApproved")}
                    />
                    <label htmlFor='isApproved' className={styles.formLabel}>
                        IsApproved
                    </label>
                    <p className={styles.error}>{errors.isApproved?.message}</p>
                </div>

                <button
                    type='submit'
                    className={styles.formButton}
                    disabled={isErrors || isSubmitting}
                >
                    Зберегти інформацію
                </button>
            </form>
        </div>
    );
}

export default DashboardPartnershipFormCreate