import * as yup from "yup";


export const dashboardUserLoginSchema = yup.object({
    email: yup
        .string()
        .required('Email - обовʼязкове поле')
        .email('Невірний формат'),
    password: yup
        .string()
        .required('Пароль - обовʼязкове поле')
        .min(7, 'Пароль занадто короткий!')
        .max(40, 'Пароль занадто довгий!'),
});