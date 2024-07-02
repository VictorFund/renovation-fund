import * as yup from "yup";
import { socialLinks } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = socialLinks.map(i => i.title)

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
    calback: yup
        .array()
        .test({
            name: "calback",
            test(value, ctx) {

                const isChecked = titleArray.some(Set.prototype.has, new Set(value));


                if (value.length === 0) {
                    return ctx.createError({
                        message: "Виберіть зворотній зв'язок",
                    });
                }

                if (!isChecked) {
                    return ctx.createError({
                        message: "Виберіть месенджер",
                    });
                }

                return true;
            },
        })

});