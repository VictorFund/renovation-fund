"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackFormSchema } from "@/yupSchemas/feedbackFormSchema";
import { callbackData } from "@/data";
import Checkboxes from "./Checkboxes";
import { useTranslation } from "react-i18next";

import styles from "./FormStyles.module.scss";


const FeedbackForm = () => {
    const schema = useMemo(() => feedbackFormSchema(), []);

    const initialValues = {
        defaultValues: {
            name: "",
            tel: "",
            email: "",
            theme: "",
            comment: "",
            callback: [],
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    };

    const { t } = useTranslation();
    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitSuccessful, isValid, isSubmitting } = formState;

    const { field } = useController({
        control,
        name: "callback",
    });

    const [value, setValue] = useState(field.value || []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setValue([]);
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        console.log("feedbackFormData:", data);
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            noValidate
        >
            <div className={styles.wrapper}>
                <div className={styles.innerBox}>
                    <div className={styles.inputWrap}>
                        <svg className={styles.iconMark}>
                            <use href='/sprite.svg#snowflake'></use>
                        </svg>
                        <p className={styles.error}>{errors.name?.message}</p>

                        <input
                            type='text'
                            {...register("name")}
                            placeholder={t('Form.Name')}
                            maxLength='30'
                            autoComplete='off'
                            className={
                                errors.name
                                    ? `${styles.input} ${styles.errorInput}`
                                    : styles.input
                            }
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <svg className={styles.iconMark}>
                            <use href='/sprite.svg#snowflake'></use>
                        </svg>
                        <p className={styles.error}>{errors.tel?.message}</p>

                        <input
                            type='text'
                            {...register("tel")}
                            placeholder={t('Form.Phone')}
                            maxLength='13'
                            autoComplete='off'
                            className={
                                errors.tel
                                    ? `${styles.input} ${styles.errorInput}`
                                    : styles.input
                            }
                        />
                    </div>
                </div>
                <div className={styles.innerBox}>
                    <div className={styles.inputWrap}>
                        <svg className={styles.iconMark}>
                            <use href='/sprite.svg#snowflake'></use>
                        </svg>
                        <p className={styles.error}>{errors.email?.message}</p>

                        <input
                            type='text'
                            {...register("email")}
                            placeholder={t('Form.Email')}
                            autoComplete='off'
                            className={
                                errors.email
                                    ? `${styles.input} ${styles.errorInput}`
                                    : styles.input
                            }
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <svg className={styles.iconMark}>
                            <use href='/sprite.svg#snowflake'></use>
                        </svg>
                        <p className={styles.error}>{errors.theme?.message}</p>

                        <input
                            type='text'
                            {...register("theme")}
                            placeholder={t('Form.Subject')}
                            autoComplete='off'
                            className={
                                errors.theme
                                    ? `${styles.input} ${styles.errorInput}`
                                    : styles.input
                            }
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.inputWrap} ${styles.textareaWrap}`}>
                <p className={styles.error}>{errors.comment?.message}</p>
                <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    cols='30'
                    rows='2'
                    placeholder={t('Form.TextArea')}
                    {...register("comment")}
                />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.inputCheckboxWrap}>
                    <p className={`${styles.error} ${styles.errorCheckbox}`}>
                        {errors.callback?.message}
                    </p>
                    <p className={styles.checkboxTitle}>
                        {t('Form.FormText')}
                    </p>
                    <Checkboxes
                        field={field}
                        options={callbackData}
                        value={value}
                        setValue={setValue}
                    />
                </div>

                <button
                    type='submit'
                    disabled={isSubmitting}
                    className={
                        isValid
                            ? `${styles.submitButton} ${styles.activeBtn}`
                            : styles.submitButton
                    }
                >
                    {t('Buttons.SendRequest')}
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;
