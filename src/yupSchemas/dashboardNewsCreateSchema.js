import * as yup from "yup";


export const dashboardNewsCreateSchema = yup.object({
    slug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "slug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardNewsFormCreate context: slugsArr
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