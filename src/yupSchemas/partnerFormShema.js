import * as yup from "yup";
import { socialLinks } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = socialLinks.map(i => i.title)

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