import * as yup from "yup";
import { callbackData } from "@/data";

const regexPhone = /^\+\d{12}$/;

const titleArray = callbackData.map(i => i.title)

import i18n from 'i18next';

export const partnerFormSchema = () => {
    return yup.object({
        name: yup
            .string()
            .required(i18n.t("FormErrors.requiredField"))
            .min(3, i18n.t("FormErrors.shortName")),
        email: yup
            .string()
            .required(i18n.t("FormErrors.requiredField"))
            .email(i18n.t("FormErrors.invalidEmail")),
        address: yup
            .string()
            .required(i18n.t("FormErrors.requiredField")),
        theme: yup
            .string()
            .required(i18n.t("FormErrors.requiredField")),
        telPersonal: yup
            .string()
            .required(i18n.t("FormErrors.requiredField"))
            .matches(regexPhone, "+380123456789"),
        telOrganization: yup
            .string()
            .required(i18n.t("FormErrors.requiredField"))
            .matches(regexPhone, "+380123456789"),

        role: yup
            .string()
            .required(i18n.t("FormErrors.requiredField")),
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
                            message: i18n.t("FormErrors.chooseCallbackMessenger"),
                        });
                    }

                    return true;
                },
            })

    })
}