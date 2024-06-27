"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardCoworkerUpdateSchema } from "@/yupSchemas/dashboardCoworkerUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from "./DashboardCoworkerFormUpdate.module.scss";


const DashboardCoworkerFormUpdate = ({ data, mutate }) => {
    const { slug, name, nameEn, photo, description, descriptionEn, isApproved } = data;

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newName: name,
            newNameEn: nameEn,
            newPhoto: photo,
            newDescription: description,
            newDescriptionEn: descriptionEn,
            newIsApproved: isApproved,
        },
        resolver: yupResolver(dashboardCoworkerUpdateSchema),
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, getValues, setValue } =
        form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting } = formState;

    const router = useRouter();


    const onSubmit = async (data) => {
        const {
            newSlug,
            newName,
            newNameEn,
            newPhoto,
            newDescription,
            newDescriptionEn,
            newIsApproved,
        } = data;

        const updatedData = {
            slug: newSlug,
            name: newName,
            nameEn: newNameEn,
            photo: newPhoto,
            description: newDescription,
            descriptionEn: newDescriptionEn,
            isApproved: newIsApproved,
        };

        const session = await getDashboardSession();
        const editor = session.user?.email;
        console.log('editor', editor)

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
        <div className={styles.formContainer}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
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
                        id='newName'
                        placeholder=' '
                        {...register("newName")}
                    />
                    <label htmlFor='newName' className={styles.formLabel}>
                        New Name
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
                        New NameEn
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
                        Update photo (WEBP)
                    </CldUploadButton>

                    <p className={styles.error}>{errors.photo?.message}</p>
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
                        New DescriptionEn
                    </label>
                    <p className={styles.error}>
                        {errors.newDescriptionEn?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newDescription'
                        placeholder=' '
                        {...register("newDescription")}
                    />
                    <label htmlFor='newDescription' className={styles.formLabel}>
                        New Description
                    </label>
                    <p className={styles.error}>
                        {errors.newDescription?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='checkbox'
                        className={styles.formInput}
                        id='newIsApproved'
                        placeholder=' '
                        {...register("newIsApproved")}
                    />
                    <label htmlFor='newIsApproved' className={styles.formLabel}>
                        New IsApproved
                    </label>
                    <p className={styles.error}>{errors.newIsApproved?.message}</p>
                </div>

                <button
                    type='submit'
                    className={styles.formButton}
                    disabled={isErrors || isSubmitting}
                >Оновити</button>
            </form>
        </div>
    );
};


export default DashboardCoworkerFormUpdate;