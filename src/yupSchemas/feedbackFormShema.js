import * as yup from "yup";

const regexPhone = /^\+\d{12}$/;

export const feedbackFormSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Too short"),
    tel: yup
        .string()
        .required("Phone is required")
        .matches(regexPhone, "+380123456789"),
    email: yup
        .string()
        .required("Email is required")
        .email(),
    theme: yup
        .string()
        .required("Theme is required"),
    comment: yup
        .string(),
    calback: yup
        .string()
        .required("Messenger is required")
});