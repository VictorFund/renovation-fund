import * as yup from "yup";


export const dashboardPartnershipUpdateSchema = yup.object({
    newSlug: yup
        .string()
        .required("Slug - обов’язкове поле"),
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
        .string()
        .required("Сайт - обов’язкове поле"),
    newIsApproved: yup
        .boolean()
});