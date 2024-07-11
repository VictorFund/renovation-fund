"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardCoworkerUpdateSchema } from "@/yupSchemas/dashboardCoworkerUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from "../DashboardComponents.module.scss";


const DashboardCoworkerFormUpdate = ({ data, mutate, isOwner, prioritiesArr }) => {
    const { slug, priority, name, nameEn, photo, description, descriptionEn, isApproved } = data;

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newPriority: priority,
            newName: name,
            newNameEn: nameEn,
            newPhoto: photo,
            newDescription: description,
            newDescriptionEn: descriptionEn,
            newIsApproved: isApproved,
        },
        resolver: yupResolver(dashboardCoworkerUpdateSchema),
        context: prioritiesArr,
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const router = useRouter();


    const onSubmit = async (data) => {
        const {
            newSlug,
            newPriority,
            newName,
            newNameEn,
            newPhoto,
            newDescription,
            newDescriptionEn,
            newIsApproved,
        } = data;

        const updatedData = {
            slug: newSlug,
            priority: newPriority,
            name: newName,
            nameEn: newNameEn,
            photo: newPhoto,
            description: newDescription,
            descriptionEn: newDescriptionEn,
            isApproved: newIsApproved,
        };

        const session = await getDashboardSession();
        const editor = session.user?.name;
        updatedData.editor = editor;

        try {
            await fetch(`/api/team/${slug}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
            });

            console.log("Information updated to DB");

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== updatedData.slug) ? router.push(`/dashboard/team/${updatedData.slug}`) : mutate();
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
            <h3 className={styles.formTitle}>Редагування картки співробітника</h3>

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
                    id='newPriority'
                    placeholder=' '
                    {...register("newPriority")}
                />
                <label htmlFor='newPriority' className={styles.formLabel}>
                    Новий пріоритет
                </label>
                <p className={styles.error}>{errors.newPriority?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newName'
                    placeholder=' '
                    {...register("newName")}
                />
                <label htmlFor='newName' className={styles.formLabel}>
                    Нове ім’я
                </label>
                <p className={styles.error}>{errors.newName?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newNameEn'
                    placeholder=' '
                    {...register("newNameEn")}
                />
                <label htmlFor='newNameEn' className={styles.formLabel}>
                    Нове ім’я англійською
                </label>
                <p className={styles.error}>{errors.newNameEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <CldUploadButton
                    name='newPhoto'
                    className={styles.uploadBtn}
                    onUpload={(result, widget) => {
                        if (getValues("newPhoto") !== "") {
                            const publicId = getValues("newPhoto");
                            handleDeleteImgFromCloudinary(publicId);
                        }
                        setValue("newPhoto", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Оновити фото (WEBP)
                </CldUploadButton>

                <p className={styles.error}>{errors.newPhoto?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newDescription'
                    placeholder=' '
                    {...register("newDescription")}
                />
                <label htmlFor='newDescription' className={styles.formLabel}>Новий опис</label>
                <p className={styles.error}>
                    {errors.newDescription?.message}
                </p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='newDescriptionEn'
                    placeholder=' '
                    {...register("newDescriptionEn")}
                />
                <label htmlFor='newDescriptionEn' className={styles.formLabel}>
                    Новий опис англійською
                </label>
                <p className={styles.error}>
                    {errors.newDescriptionEn?.message}
                </p>
            </div>

            {isOwner && <div className={styles.checkboxInputGroup}>
                <label htmlFor='newIsApproved' className={styles.checkboxLabel}>Розміщення на сайті</label>
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
};


export default DashboardCoworkerFormUpdate;