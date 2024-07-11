import * as yup from "yup";


export const dashboardCoworkerCreateSchema = yup.object({
    slug: yup
        .string()
        .required("Slug - обов’язкове поле"),
    priority: yup.number()
        .required("Пріоритет - обовʼязкове поле")
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа")
        .test({
            name: "priority",
            test(value, ctx) {
                const isExist = this.options.context.includes(value);
                if (isExist) {
                    return ctx.createError({
                        message: "Такий пріоритет вже існує"
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