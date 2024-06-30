"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardProjectUpdateSchema } from "@/yupSchemas/dashboardProjectUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import styles from '../DashboardComponents.module.scss'


const DashboardProjectFormUpdate = ({ data, mutate }) => {
    const { slug, title, titleEn, image, shortDescription, shortDescriptionEn, state, startDate, sum, mission, missionEn, goal, goalEn, audience, audienceEn, concept, conceptEn, description, descriptionEn, link, isApproved } = data;

    const initialValues = {
        defaultValues: {
            newSlug: slug,
            newTitle: title,
            newTitleEn: titleEn,
            newImage: image,
            newShortDescription: shortDescription,
            newShortDescriptionEn: shortDescriptionEn,
            newState: state,
            newStartDate: startDate,
            newSum: sum,
            newMission: mission,
            newMissionEn: missionEn,
            newGoal: goal,
            newGoalEn: goalEn,
            newAudience: audience,
            newAudienceEn: audienceEn,
            newConcept: concept,
            newConceptEn: conceptEn,
            newDescription: description,
            newDescriptionEn: descriptionEn,
            newLink: link,
            newIsApproved: isApproved,
        },
        resolver: yupResolver(dashboardProjectUpdateSchema),
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
            newShortDescription,
            newShortDescriptionEn,
            newState,
            newStartDate,
            newSum,
            newMission,
            newMissionEn,
            newGoal,
            newGoalEn,
            newAudience,
            newAudienceEn,
            newConcept,
            newConceptEn,
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
            shortDescription: newShortDescription,
            shortDescriptionEn: newShortDescriptionEn,
            state: newState,
            startDate: newStartDate,
            sum: newSum,
            mission: newMission,
            missionEn: newMissionEn,
            goal: newGoal,
            goalEn: newGoalEn,
            audience: newAudience,
            audienceEn: newAudienceEn,
            concept: newConcept,
            conceptEn: newConceptEn,
            description: newDescription,
            descriptionEn: newDescriptionEn,
            link: newLink,
            isApproved: newIsApproved,
        };

        const session = await getDashboardSession();
        const editor = session.user?.email;
        console.log('editor', editor)

        try {
            await fetch(`/api/projects/${slug}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
            });

            console.log("Information updated to DB");

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== updatedData.slug) ? router.push(`/dashboard/projects/${updatedData.slug}`) : mutate();
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
                <h3 className={styles.formTitle}>Редагування картки проєкту</h3>

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
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newShortDescription'
                        placeholder=' '
                        {...register("newShortDescription")}
                    />
                    <label htmlFor='newShortDescription' className={styles.formLabel}>
                        Новий короткий опис
                    </label>
                    <p className={styles.error}>
                        {errors.newShortDescription?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newShortDescriptionEn'
                        placeholder=' '
                        {...register("newShortDescriptionEn")}
                    />
                    <label htmlFor='newShortDescriptionEn' className={styles.formLabel}>
                        Новий короткий опис англійською
                    </label>
                    <p className={styles.error}>
                        {errors.newShortDescriptionEn?.message}
                    </p>
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
                            {...register("newState")}

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
                            {...register("newState")}
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
                            {...register("newState")}
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
                        id='newStartDate'
                        placeholder=' '
                        {...register("newStartDate")}
                    />
                    <label htmlFor='newStartDate' className={styles.formLabel}>
                        Нова дата початку проєкту
                    </label>
                    <p className={styles.error}>
                        {errors.newStartDate?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newSum'
                        placeholder=' '
                        {...register("newSum")}
                    />
                    <label htmlFor='newSum' className={styles.formLabel}>
                        Нова сума
                    </label>
                    <p className={styles.error}>
                        {errors.newSum?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newMission'
                        placeholder=' '
                        {...register("newMission")}
                    />
                    <label htmlFor='newMission' className={styles.formLabel}>
                        Нова місія
                    </label>
                    <p className={styles.error}>
                        {errors.newMission?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newMissionEn'
                        placeholder=' '
                        {...register("newMissionEn")}
                    />
                    <label htmlFor='newMissionEn' className={styles.formLabel}>
                        Нова місія англійською
                    </label>
                    <p className={styles.error}>
                        {errors.newMissionEn?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newGoal'
                        placeholder=' '
                        {...register("newGoal")}
                    />
                    <label htmlFor='newGoal' className={styles.formLabel}>
                        Нова мета
                    </label>
                    <p className={styles.error}>
                        {errors.newGoal?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newGoalEn'
                        placeholder=' '
                        {...register("newGoalEn")}
                    />
                    <label htmlFor='newGoalEn' className={styles.formLabel}>
                        Нова мета англійською
                    </label>
                    <p className={styles.error}>
                        {errors.newGoalEn?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newAudience'
                        placeholder=' '
                        {...register("newAudience")}
                    />
                    <label htmlFor='newAudience' className={styles.formLabel}>
                        Нова аудиторія
                    </label>
                    <p className={styles.error}>
                        {errors.newAudience?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newAudienceEn'
                        placeholder=' '
                        {...register("newAudienceEn")}
                    />
                    <label htmlFor='newAudienceEn' className={styles.formLabel}>
                        Нова аудиторія англійською
                    </label>
                    <p className={styles.error}>
                        {errors.newAudienceEn?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newConcept'
                        placeholder=' '
                        {...register("newConcept")}
                    />
                    <label htmlFor='newConcept' className={styles.formLabel}>
                        Новий концепт
                    </label>
                    <p className={styles.error}>
                        {errors.newConcept?.message}
                    </p>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type='text'
                        className={styles.formInput}
                        id='newConceptEn'
                        placeholder=' '
                        {...register("newConceptEn")}
                    />
                    <label htmlFor='newConceptEn' className={styles.formLabel}>
                        Новий концепт англійською
                    </label>
                    <p className={styles.error}>
                        {errors.newConceptEn?.message}
                    </p>
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
                        Новий опис
                    </label>
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
                        Новий опис англійською
                    </label>
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

export default DashboardProjectFormUpdate