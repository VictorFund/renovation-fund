"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardNewsUpdateSchema } from "@/yupSchemas/dashboardNewsUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardNewsFormUpdate = ({ data, mutate }) => {
    const { slug, title, titleEn, image, description, descriptionEn, link, isApproved } = data;

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newTitle: title,
            newTitleEn: titleEn,
            newImage: image,
            newDescription: description,
            newDescriptionEn: descriptionEn,
            newLink: link,
            newIsApproved: isApproved,
        },
        resolver: yupResolver(dashboardNewsUpdateSchema),
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
            newImage,
            newDescription,
            newDescriptionEn,
            newLink,
            newIsApproved,
        } = data;

        const updatedData = {
            slug: newSlug,
            title: newTitle,
            titleEn: newTitleEn,
            image: newImage,
            description: newDescription,
            descriptionEn: newDescriptionEn,
            link: newLink,
            isApproved: newIsApproved,
        };

        const session = await getDashboardSession();
        const editor = session.user?.email;
        console.log('editor', editor)

        try {
            await fetch(`/api/news/${slug}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
            });

            console.log("Information updated to DB");

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== updatedData.slug) ? router.push(`/dashboard/news/${updatedData.slug}`) : mutate();
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
                <h3 className={styles.formTitle}>Редагування картки новини</h3>

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

                <div className={styles.inputGroup}>
                    <CldUploadButton
                        name='newImage'
                        className={styles.uploadBtn}
                        onUpload={(result, widget) => {
                            if (getValues("newImage") !== "") {
                                const publicId = getValues("newImage");
                                handleDeleteImgFromCloudinary(publicId);
                            }
                            setValue("newImage", result.info.public_id, {
                                shouldValidate: true,
                            });
                            widget.close();
                        }}
                        options={{ multiple: false }}
                        uploadPreset='unsigned_preset'
                    >
                        Оновити фото (WEBP)
                    </CldUploadButton>

                    <p className={styles.error}>{errors.newImage?.message}</p>
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        type='text'
                        className={styles.formInput}
                        id='newDescription'
                        placeholder=' '
                        {...register("newDescription")}
                    />
                    <label htmlFor='newDescription' className={styles.formLabel}>
                        Новий опис                    </label>
                    <p className={styles.error}>
                        {errors.newDescription?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        type='text'
                        className={styles.formInput}
                        id='newDescriptionEn'
                        placeholder=' '
                        {...register("newDescriptionEn")}
                    />
                    <label htmlFor='newDescriptionEn' className={styles.formLabel}>
                        Новий опис англійською                    </label>
                    <p className={styles.error}>
                        {errors.newDescriptionEn?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newLink'
                        placeholder=' '
                        {...register("newLink")}
                    />
                    <label htmlFor='newLink' className={styles.formLabel}>
                        Нове посилання на ресурс
                    </label>
                    <p className={styles.error}>{errors.newLink?.message}</p>
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

export default DashboardNewsFormUpdate