import * as yup from "yup";


export const dashboardProjectUpdateSchema = yup.object({
    newSlug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "newSlug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardProjectFormUpdate context: slugsArr
                const isExist = this.options.context.includes(trimedValue);
                if (isExist) {
                    return ctx.createError({
                        message: "Такий slug вже існує"
                    })
                }
                return true;
            },
        }),
    newTitle: yup
        .string()
        .required("Заголовок - обов’язкове поле"),
    newTitleEn: yup
        .string()
        .required("Заголовок англійською - обов’язкове поле"),
    newImage: yup
        .string()
        .required("Фото - обов’язкове поле"),
    newShortDescription: yup
        .string()
        .required("Короткий опис - обов’язкове поле"),
    newShortDescriptionEn: yup
        .string()
        .required("Короткий опис англійською - обов’язкове поле"),
    newState: yup
        .string()
        .required("Стан - обов’язкове поле"),
    newStartDate: yup
        .string(),
    newSum: yup
        .number()
        .transform((value, original) => (original === "" ? null : value))
        .nullable()
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа"),
    newPayLink: yup
        .string(),
    newMission: yup
        .string()
        .required("Місія - обов’язкове поле"),
    newMissionEn: yup
        .string()
        .required("Місія англійською - обов’язкове поле"),
    newGoal: yup
        .string()
        .required("Мета - обов’язкове поле"),
    newGoalEn: yup
        .string()
        .required("Мета англійською - обов’язкове поле"),
    newAudience: yup
        .string()
        .required("Аудиторія - обов’язкове поле"),
    newAudienceEn: yup
        .string()
        .required("Аудиторія англійською - обов’язкове поле"),
    newConcept: yup
        .string()
        .required("Концепт - обов’язкове поле"),
    newConceptEn: yup
        .string()
        .required("Концепт англійською - обов’язкове поле"),
    newDescription: yup
        .string()
        .required("Опис - обов’язкове поле"),
    newDescriptionEn: yup
        .string()
        .required("Опис англійською - обов’язкове поле"),
    newLink: yup
        .string(),
    newIsApproved: yup
        .boolean()
});