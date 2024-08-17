import * as yup from "yup";


export const dashboardNewsUpdateSchema = yup.object({
    newSlug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "newSlug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardNewsFormUpdate context: slugsArr
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