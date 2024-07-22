import * as yup from "yup";
import { callbackData } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = callbackData.map(i => i.title)

export const feedbackFormSchema = yup.object({
    name: yup
        .string()
        .required("Заповніть це поле")
        .min(3, "Ім’я має бути довшим"),
    tel: yup
        .string()
        .required("Заповніть це поле")
        .matches(regexPhone, "+380123456789"),
    email: yup
        .string()
        .required("Заповніть це поле")
        .email("Не валідний email"),
    theme: yup
        .string()
        .required("Заповніть це поле"),
    comment: yup
        .string(),
    callback: yup
        .array()
        .test({
            name: "callback",
            test(value, ctx) {

                const isChecked = titleArray.some(Set.prototype.has, new Set(value));

                if (!isChecked) {
                    return ctx.createError({
                        message: "Виберіть месенджер",
                    });
                }

                return true;
            },
        })

});