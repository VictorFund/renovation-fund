"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardCoworkerCreateSchema } from "@/yupSchemas/dashboardCoworkerCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from './DashboardCoworkerFormCreate.module.scss'
import { boolean } from "yup";


const DashboardCoworkerFormCreate = ({ mutate }) => {
    const initialValues = {
        defaultValues: {
            slug: "",
            name: "",
            nameEn: "",
            photo: "",
            description: "",
            descriptionEn: "",
            isApproved: false,
        },
        resolver: yupResolver(dashboardCoworkerCreateSchema),
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
        <div className={styles.formContainer}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
            >
                <h3 className={styles.formTitle}>
                    Створення картки нового співробітника
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
                        id='name'
                        placeholder=' '
                        {...register("name")}
                    />
                    <label htmlFor='name' className={styles.formLabel}>
                        Name
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
                        NameEn
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
                        Description
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
                        DescriptionEn
                    </label>
                    <p className={styles.error}>{errors.descriptionEn?.message}</p>
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
                    Створити
                </button>
            </form>
        </div>
    );
};


export default DashboardCoworkerFormCreate;