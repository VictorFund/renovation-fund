"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardNewsCreateSchema } from "@/yupSchemas/dashboardNewsCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardNewsFormCreate = ({ mutate, isOwner }) => {
    const initialValues = {
        defaultValues: {
            slug: "",
            title: "",
            titleEn: "",
            image: "",
            description: "",
            descriptionEn: "",
            link: "",
            isApproved: false,
        },
        resolver: yupResolver(dashboardNewsCreateSchema),
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        const session = await getDashboardSession();
        const editor = session.user?.name;
        data.editor = editor;

        try {
            await fetch("/api/news", {
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.dataForm}
            noValidate
        >
            <h3 className={styles.formTitle}>
                Створення картки новини
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

            <div className={styles.inputGroup}>
                <CldUploadButton
                    name='image'
                    className={styles.uploadBtn}
                    onUpload={(result, widget) => {
                        if (getValues("image") !== "") {
                            const publicId = getValues("image");
                            handleDeleteImgFromCloudinary(publicId);
                        }
                        setValue("image", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Додати фото (WEBP) (min 1280*580)
                </CldUploadButton>

                <p className={styles.error}>{errors.image?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <textarea
                    type='text'
                    className={styles.formInput}
                    id='description'
                    placeholder=' '
                    {...register("description")}
                />
                <label htmlFor='description' className={styles.formLabel}>
                    Опис
                </label>
                <p className={styles.error}>{errors.description?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <textarea
                    type='text'
                    className={styles.formInput}
                    id='descriptionEn'
                    placeholder=' '
                    {...register("descriptionEn")}
                />
                <label htmlFor='descriptionEn' className={styles.formLabel}>
                    Опис англійською
                </label>
                <p className={styles.error}>{errors.descriptionEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='link'
                    placeholder=' '
                    {...register("link")}
                />
                <label htmlFor='link' className={styles.formLabel}>
                    Посилання на ресурс
                </label>
                <p className={styles.error}>{errors.link?.message}</p>
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

export default DashboardNewsFormCreate