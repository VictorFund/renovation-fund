import * as yup from "yup";


export const dashboardCoworkerCreateSchema = yup.object({
    slug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "slug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardCoworkerFormCreate context: contextsForSchema
                const isExist = this.options.context.slugs.includes(trimedValue);
                if (isExist) {
                    return ctx.createError({
                        message: "Такий slug вже існує",
                    })
                }
                return true;
            },
        }),
    priority: yup.number()
        .required("Пріоритет - обовʼязкове поле")
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа")
        .test({
            name: "priority",
            test(value, ctx) {
                const trimedValue = value.toString().trim();
                // this.options.context - from DashboardCoworkerFormCreate context: contextsForSchema
                const isExist = this.options.context.priorities.includes(trimedValue);
                if (isExist) {
                    return ctx.createError({
                        message: "Такий пріоритет вже існує",
                    })
                }
                return true;
            },
        }),
    name: yup
        .string()
        .required("Ім’я - обов’язкове поле"),
    nameEn: yup
        .string()
        .required("Ім’я англійською - обов’язкове поле"),
    photo: yup
        .string()
        .required("Фото - обов’язкове поле"),
    description: yup
        .string()
        .required("Опис - обов’язкове поле"),
    descriptionEn: yup
        .string()
        .required("Опис англійською - обов’язкове поле"),
    isApproved: yup
        .boolean()
});