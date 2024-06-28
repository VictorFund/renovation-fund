import * as yup from "yup";


export const dashboardPartnershipCreateSchema = yup.object({
    slug: yup
        .string()
        .required("Slug - обов’язкове поле"),
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
        .string()
        .required("Сайт - обов’язкове поле"),
    isApproved: yup
        .boolean()
});