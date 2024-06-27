import * as yup from "yup";


export const dashboardCoworkerCreateSchema = yup.object({
    slug: yup
        .string()
        .required("Slug - обов’язкове поле"),
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
    positionEn: yup
        .string()
        .required("Опис англійською - обов’язкове поле"),
    isApproved: yup
        .boolean()
});