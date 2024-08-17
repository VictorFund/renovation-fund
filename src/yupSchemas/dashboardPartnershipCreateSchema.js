import * as yup from "yup";


export const dashboardPartnershipCreateSchema = yup.object({
    slug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "slug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardPartnershipFormCreate context: slugsArr
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
    isMainPartner: yup
        .boolean(),
    logo: yup
        .string(),
    siteLink: yup
        .string(),
    isApproved: yup
        .boolean()
});