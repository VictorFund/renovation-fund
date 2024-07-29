"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardNewsUpdateSchema } from "@/yupSchemas/dashboardNewsUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardNewsFormUpdate = ({ data, mutate, isOwner }) => {
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
    const { register, handleSubmit, formState, getValues, setValue } =
        form;
    const { errors, isErrors, isSubmitting } = formState;

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

        const forSendData = { ...updatedData };
        const session = await getDashboardSession();
        const editor = session.user?.name;
        forSendData.editor = editor;
        const trimedSlug = forSendData.slug.trim();
        forSendData.slug = trimedSlug;

        try {
            await fetch(`/api/news/${slug}`, {
                method: "PUT",
                body: JSON.stringify(forSendData),
            });

            console.log("Information updated to DB");

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== forSendData.slug) ? router.push(`/dashboard/news/${forSendData.slug}`) : mutate();
        } catch (err) {
            console.log(err);
        }
    };


    return (
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
                    Оновити фото (WEBP) (min 1280*580)
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

export default DashboardNewsFormUpdate