import * as yup from "yup";


export const dashboardCoworkerCreateSchema = yup.object({
    slug: yup
        .string()
        .required("Slug - обов’язкове поле"),
    priority: yup.number()
        .required("Пріоритет це обовʼязкове поле")
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа"),
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