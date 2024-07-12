"use client";

import { useState, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackFormSchema } from "@/yupSchemas/feedbackFormShema";
import { callbackData } from "@/data";
import Checkboxes from "./Checkboxes";

import styles from "./FormStyles.module.scss";

const FeedbackForm = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            tel: "",
            email: "",
            theme: "",
            comment: "",
            calback: [],
        },
        resolver: yupResolver(feedbackFormSchema),
        mode: "onChange",
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitSuccessful, isValid, isSubmitting } = formState;

    const { field } = useController({
        control,
        name: "calback",
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
                            placeholder='Ім’я'
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
                            placeholder='Номер телефона'
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
                            placeholder='Адреса електронної пошти'
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
                            placeholder='Тема'
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
                    placeholder='Коротко опишіть ваше побажання'
                    {...register("comment")}
                />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.inputCheckboxWrap}>
                    <p className={`${styles.error} ${styles.errorCheckbox}`}>
                        {errors.calback?.message}
                    </p>
                    <p className={styles.checkboxTitle}>
                        Оберіть мессенджер для зв’язку
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
                    Надіслати заявку
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;
