import * as yup from "yup";


export const dashboardNewsCreateSchema = yup.object({
    slug: yup
        .string()
        .required("Slug - обов’язкове поле"),
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