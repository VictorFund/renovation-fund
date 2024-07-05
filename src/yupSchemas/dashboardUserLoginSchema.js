import * as yup from "yup";


export const dashboardUserLoginSchema = yup.object({
    email: yup
        .string()
        .required('Email це обовʼязкове поле')
        .email('Невірний формат'),
    password: yup
        .string()
        .required('Пароль це обовʼязкове поле')
        .min(7, 'Пароль занадто короткий!')
        .max(40, 'Пароль занадто довгий!'),
});