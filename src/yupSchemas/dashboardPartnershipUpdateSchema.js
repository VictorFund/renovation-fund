import * as yup from "yup";


export const dashboardPartnershipUpdateSchema = yup.object({
    newSlug: yup.string()
        .required("Slug - обов’язкове поле")
        .test({
            name: "newSlug",
            test(value, ctx) {
                const trimedValue = value.trim();
                // this.options.context - from DashboardPartnershipFormUpdate context: slugsArr
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
    newIsMainPartner: yup
        .boolean(),
    newLogo: yup
        .string(),
    newSiteLink: yup
        .string(),
    newIsApproved: yup
        .boolean()
});