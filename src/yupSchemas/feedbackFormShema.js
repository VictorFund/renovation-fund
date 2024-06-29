import * as yup from "yup";
import { socialLinks } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = socialLinks.map(i => i.title)

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
        .array()
        .test({
            name: "calback",
            test(value, ctx) {

                const isChecked = titleArray.some(Set.prototype.has, new Set(value));


                if (value.length === 0) {
                    return ctx.createError({
                        message: "Array Empty",
                    });
                }

                if (!isChecked) {
                    return ctx.createError({
                        message: "There is no values!",
                    });
                }

                return true;
            },
        })

});