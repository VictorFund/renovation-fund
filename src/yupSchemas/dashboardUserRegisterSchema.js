import * as yup from "yup";


export const dashboardUserRegisterSchema = yup.object({
    name: yup
        .string()
        .required('Імʼя - обовʼязкове поле')
        .min(3, 'Імʼя занадто коротке!')
        .max(40, 'Імʼя занадто довге!'),
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