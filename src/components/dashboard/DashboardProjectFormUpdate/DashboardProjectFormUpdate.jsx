"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardProjectUpdateSchema } from "@/yupSchemas/dashboardProjectUpdateSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { getDashboardSession } from "@/utils/getDashboardSession";
import { isDeepEqual } from "@/utils/isDeepEqual";
import styles from '../DashboardComponents.module.scss';


const DashboardProjectFormUpdate = ({ data, mutate, isOwner, slugsArr }) => {
    const { slug, title, titleEn, image, shortDescription, shortDescriptionEn, state, startDate, sum, payLink, mission, missionEn, goal, goalEn, audience, audienceEn, concept, conceptEn, description, descriptionEn, link, isApproved, editor } = data;

    const receivedData = { slug, title, titleEn, image, shortDescription, shortDescriptionEn, state, startDate, sum, payLink, mission, missionEn, goal, goalEn, audience, audienceEn, concept, conceptEn, description, descriptionEn, link, isApproved, editor }

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
            newPayLink: payLink,
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
            newEditor: editor,
        },
        resolver: yupResolver(dashboardProjectUpdateSchema),
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
            newShortDescription,
            newShortDescriptionEn,
            newState,
            newStartDate,
            newSum,
            newPayLink,
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
            newEditor,
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
            payLink: newPayLink,
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
            await fetch(`/api/projects/${slug}`, {
                method: "PUT",
                body: JSON.stringify(forSendData),
            });

            // по умові виконується або перехід на іншу сторінку, або оновлення існуючої
            (slug !== forSendData.slug) ? router.push(`/dashboard/projects/${forSendData.slug}`) : mutate();

            toast.success(`Картка проєкту "${forSendData.slug}" оновлена!`);

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
                    Оновити фото (WEBP) (min 695*536)
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
                    id='newPayLink'
                    placeholder=' '
                    {...register("newPayLink")}
                />
                <label htmlFor='newPayLink' className={styles.formLabel}>
                    Нове посилання для платіжної системи
                </label>
                <p className={styles.error}>
                    {errors.newPayLink?.message}
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

export default DashboardProjectFormUpdate