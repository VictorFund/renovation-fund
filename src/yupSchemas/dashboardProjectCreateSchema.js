import * as yup from "yup";


export const dashboardProjectCreateSchema = yup.object({
    slug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "slug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardProjectFormCreate context: slugsArr
                const isExist = this.options.context.includes(trimedValue);
                if (isExist) {
                    return ctx.createError({
                        message: "Такий slug вже існує"
                    })
                }
                return true;
            },
        }),
    title: yup
        .string()
        .required("Заголовок - обов’язкове поле"),
    titleEn: yup
        .string()
        .required("Заголовок англійською - обов’язкове поле"),
    image: yup
        .string()
        .required("Фото - обов’язкове поле"),
    shortDescription: yup
        .string()
        .required("Короткий опис - обов’язкове поле"),
    shortDescriptionEn: yup
        .string()
        .required("Короткий опис англійською - обов’язкове поле"),
    state: yup
        .string()
        .required("Стан - обов’язкове поле"),
    startDate: yup
        .string(),
    sum: yup
        .number()
        .transform((value, original) => (original === "" ? null : value))
        .nullable()
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа"),
    payLink: yup
        .string(),
    mission: yup
        .string()
        .required("Місія - обов’язкове поле"),
    missionEn: yup
        .string()
        .required("Місія англійською - обов’язкове поле"),
    goal: yup
        .string()
        .required("Мета - обов’язкове поле"),
    goalEn: yup
        .string()
        .required("Мета англійською - обов’язкове поле"),
    audience: yup
        .string()
        .required("Аудиторія - обов’язкове поле"),
    audienceEn: yup
        .string()
        .required("Аудиторія англійською - обов’язкове поле"),
    concept: yup
        .string()
        .required("Концепт - обов’язкове поле"),
    conceptEn: yup
        .string()
        .required("Концепт англійською - обов’язкове поле"),
    description: yup
        .string()
        .required("Опис - обов’язкове поле"),
    descriptionEn: yup
        .string()
        .required("Опис англійською - обов’язкове поле"),
    link: yup
        .string(),
    isApproved: yup
        .boolean()
});