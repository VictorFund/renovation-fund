"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardProjectCreateSchema } from "@/yupSchemas/dashboardProjectCreateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss';


const DashboardProjectFormCreate = ({ mutate, isOwner, slugsArr }) => {
    const initialValues = {
        defaultValues: {
            slug: "",
            title: "",
            titleEn: "",
            image: "",
            shortDescription: "",
            shortDescriptionEn: "",
            state: "",
            startDate: "",
            sum: "",
            payLink: "",
            mission: "",
            missionEn: "",
            goal: "",
            goalEn: "",
            audience: "",
            audienceEn: "",
            concept: "",
            conceptEn: "",
            description: "",
            descriptionEn: "",
            link: "",
            isApproved: false,
        },
        resolver: yupResolver(dashboardProjectCreateSchema),
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
            await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify(forSendData),
            });
            // автоматично оновлює сторінку при зміні кількості карток
            mutate();

            toast.success(`Картка проєкту "${forSendData.slug}" створена!`);

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
                Створення картки проєкту
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
                    onSuccess={(result, widget) => {
                        if (getValues("image") !== "") {
                            const publicId = getValues("image");
                            handleDeleteImgFromCloudinary(publicId);
                            toast.success("Попереднє фото видалено з Cloudinary!");
                        }
                        setValue("image", result.info.public_id, {
                            shouldValidate: true,
                        });
                        widget.close();
                        toast.success("Нове фото додано до Cloudinary!");
                    }}
                    options={{ multiple: false }}
                    uploadPreset='unsigned_preset'
                >
                    Додати фото (WEBP) (min 695*536)
                </CldUploadButton>

                <p className={styles.error}>{errors.image?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='shortDescription'
                    placeholder=' '
                    {...register("shortDescription")}
                />
                <label htmlFor='shortDescription' className={styles.formLabel}>
                    Короткий опис
                </label>
                <p className={styles.error}>{errors.shortDescription?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='shortDescriptionEn'
                    placeholder=' '
                    {...register("shortDescriptionEn")}
                />
                <label htmlFor='shortDescriptionEn' className={styles.formLabel}>
                    Короткий опис англійською
                </label>
                <p className={styles.error}>{errors.shortDescriptionEn?.message}</p>
            </div>

            <div className={styles.radioInputGroup}>
                <p>Стан проєкту:</p>
                <div className={styles.radioItemWrapper}>
                    <input
                        type='radio'
                        className={styles.radio}
                        id='fieldAnnounced'
                        value="Анонсований"
                        placeholder=' '
                        {...register("state")}
                        defaultChecked
                    />
                    <label htmlFor='fieldAnnounced' className={styles.radioLabel}>
                        Анонсований
                    </label>
                </div>
                <div className={styles.radioItemWrapper}>
                    <input
                        type='radio'
                        className={styles.radio}
                        id='fieldCurrent'
                        value="Поточний"
                        placeholder=' '
                        {...register("state")}
                    />
                    <label htmlFor='fieldCurrent' className={styles.radioLabel}>
                        Поточний
                    </label>
                </div>
                <div className={styles.radioItemWrapper}>
                    <input
                        type='radio'
                        className={styles.radio}
                        id='fieldImplemented'
                        value="Реалізований"
                        placeholder=' '
                        {...register("state")}
                    />
                    <label htmlFor='fieldImplemented' className={styles.radioLabel}>
                        Реалізований
                    </label>
                </div>
                <p className={styles.error}>{errors.state?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='startDate'
                    placeholder=' '
                    {...register("startDate")}
                />
                <label htmlFor='startDate' className={styles.formLabel}>
                    Дата початку проєкту
                </label>
                <p className={styles.error}>{errors.startDate?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='sum'
                    placeholder=' '
                    {...register("sum")}
                />
                <label htmlFor='sum' className={styles.formLabel}>
                    Сума
                </label>
                <p className={styles.error}>{errors.sum?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='payLink'
                    placeholder=' '
                    {...register("payLink")}
                />
                <label htmlFor='payLink' className={styles.formLabel}>
                    Посилання для платіжної системи
                </label>
                <p className={styles.error}>{errors.payLink?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='mission'
                    placeholder=' '
                    {...register("mission")}
                />
                <label htmlFor='mission' className={styles.formLabel}>
                    Місія
                </label>
                <p className={styles.error}>{errors.mission?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='missionEn'
                    placeholder=' '
                    {...register("missionEn")}
                />
                <label htmlFor='missionEn' className={styles.formLabel}>
                    Місія англійською
                </label>
                <p className={styles.error}>{errors.missionEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='goal'
                    placeholder=' '
                    {...register("goal")}
                />
                <label htmlFor='goal' className={styles.formLabel}>
                    Мета
                </label>
                <p className={styles.error}>{errors.goal?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='goalEn'
                    placeholder=' '
                    {...register("goalEn")}
                />
                <label htmlFor='goalEn' className={styles.formLabel}>
                    Мета англійською
                </label>
                <p className={styles.error}>{errors.goalEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='audience'
                    placeholder=' '
                    {...register("audience")}
                />
                <label htmlFor='audience' className={styles.formLabel}>
                    Аудиторія
                </label>
                <p className={styles.error}>{errors.audience?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='audienceEn'
                    placeholder=' '
                    {...register("audienceEn")}
                />
                <label htmlFor='audienceEn' className={styles.formLabel}>
                    Аудиторія англійською
                </label>
                <p className={styles.error}>{errors.audienceEn?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='concept'
                    placeholder=' '
                    {...register("concept")}
                />
                <label htmlFor='concept' className={styles.formLabel}>
                    Концепт
                </label>
                <p className={styles.error}>{errors.concept?.message}</p>
            </div>

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    className={styles.formInput}
                    id='conceptEn'
                    placeholder=' '
                    {...register("conceptEn")}
                />
                <label htmlFor='conceptEn' className={styles.formLabel}>
                    Концепт англійською
                </label>
                <p className={styles.error}>{errors.conceptEn?.message}</p>
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

export default DashboardProjectFormCreate