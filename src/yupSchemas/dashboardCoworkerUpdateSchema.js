import * as yup from "yup";


export const dashboardCoworkerUpdateSchema = yup.object({
    newSlug: yup
        .string()
        .required("Slug - обов’язкове поле"),
    newName: yup
        .string()
        .required("Ім’я - обов’язкове поле"),
    newNameEn: yup
        .string()
        .required("Ім’я англійською - обов’язкове поле"),
    newPhoto: yup
        .string()
        .required("Фото - обов’язкове поле"),
    newDescription: yup
        .string()
        .required("Опис - обов’язкове поле"),
    newDescriptionEn: yup
        .string()
        .required("Опис англійською - обов’язкове поле"),
    newIsApproved: yup
        .boolean()
});