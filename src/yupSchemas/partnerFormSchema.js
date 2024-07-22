import * as yup from "yup";
import { callbackData } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = callbackData.map(i => i.title)

export const partnerFormSchema = yup.object({
    name: yup
        .string()
        .required("Заповніть це поле")
        .min(3, "Ім’я має бути довшим"),
    email: yup
        .string()
        .required("Заповніть це поле")
        .email("Не валідний email"),
    address: yup
        .string()
        .required("Заповніть це поле"),
    theme: yup
        .string()
        .required("Заповніть це поле"),
    telPersonal: yup
        .string()
        .required("Заповніть це поле")
        .matches(regexPhone, "+380123456789"),
    telOrganization: yup
        .string()
        .required("Заповніть це поле")
        .matches(regexPhone, "+380123456789"),

    role: yup
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