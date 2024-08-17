"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardNewsUpdateSchema } from "@/yupSchemas/dashboardNewsUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import { isDeepEqual } from "@/utils/isDeepEqual";
import styles from '../DashboardComponents.module.scss';


const DashboardNewsFormUpdate = ({ data, mutate, isOwner, slugsArr }) => {
    const { slug, title, titleEn, image, description, descriptionEn, link, isApproved, editor } = data;

    const receivedData = { slug, title, titleEn, image, description, descriptionEn, link, isApproved, editor };

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
            newEditor: editor,
        },
        resolver: yupResolver(dashboardNewsUpdateSchema),
        context: slugsArr,
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
            newEditor,
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
            await fetch(`/api/news/${slug}`, {
                method: "PUT",
                body: JSON.stringify(forSendData),
            });

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== forSendData.slug) ? router.push(`/dashboard/news/${forSendData.slug}`) : mutate();

            toast.success(`Картка новини "${forSendData.slug}" оновлена!`);

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
                    onSuccess={(result, widget) => {
                        if (getValues("newImage") !== "") {
                            const publicId = getValues("newImage");
                            handleDeleteImgFromCloudinary(publicId);
                            toast.success("Попереднє фото видалено з Cloudinary!");
                        }
                        setValue("newImage", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                        toast.success("Нове фото додано до Cloudinary!");
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