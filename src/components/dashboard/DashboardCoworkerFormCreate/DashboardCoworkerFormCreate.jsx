"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardCoworkerCreateSchema } from "@/yupSchemas/dashboardCoworkerCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardCoworkerFormCreate = ({ mutate, isOwner, prioritiesArr }) => {
    const initialValues = {
        defaultValues: {
            slug: "",
            priority: "",
            name: "",
            nameEn: "",
            photo: "",
            description: "",
            descriptionEn: "",
            isApproved: false,
        },
        resolver: yupResolver(dashboardCoworkerCreateSchema),
        context: prioritiesArr,
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } = form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        const session = await getDashboardSession();
        const editor = session.user?.name;
        data.editor = editor;

        try {
            await fetch("/api/team", {
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
                Створення картки співробітника
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
                    id='priority'
                    placeholder=' '
                    {...register("priority")}
                />
                <label htmlFor='priority' className={styles.formLabel}>
                    Пріоритет
                </label>
                <p className={styles.error}>{errors.priority?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='name'
                    placeholder=' '
                    {...register("name")}
                />
                <label htmlFor='name' className={styles.formLabel}>
                    Ім’я
                </label>
                <p className={styles.error}>{errors.name?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='nameEn'
                    placeholder=' '
                    {...register("nameEn")}
                />
                <label htmlFor='nameEn' className={styles.formLabel}>
                    Ім’я англійською
                </label>
                <p className={styles.error}>{errors.nameEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <CldUploadButton
                    name='photo'
                    className={styles.uploadBtn}
                    onUpload={(result, widget) => {
                        if (getValues("photo") !== "") {
                            const publicId = getValues("photo");
                            handleDeleteImgFromCloudinary(publicId);
                        }
                        setValue("photo", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Додати фото (WEBP)
                </CldUploadButton>

                <p className={styles.error}>{errors.photo?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
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
                <input
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
};


export default DashboardCoworkerFormCreate;