"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackFormSchema } from "@/yupSchemas/feedbackFormShema";

import styles from "./formStyles.module.scss";

const FeedbackForm = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            tel: "",
            email: "",
            theme: "",
            comment: "",
            calback: "",
        },
        resolver: yupResolver(feedbackFormSchema),
        mode: "onChange",
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful, isErrors, isSubmitting, dirtyFields } =
        formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        console.log("data", data);
    };
    return (
        <div>
            <h2>Зв’яжись з нами</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
            >
                <div className={styles.inputWrap}>
                    <p className={styles.error}>{errors.name?.message}</p>

                    <input
                        type='text'
                        {...register("name")}
                        placeholder='Ім’я'
                        maxLength='30'
                        autoComplete='off'
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <p className={styles.error}>{errors.tel?.message}</p>

                    <input
                        type='text'
                        {...register("tel")}
                        placeholder='Номер телефона'
                        maxLength='13'
                        autoComplete='off'
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <p className={styles.error}>{errors.email?.message}</p>

                    <input
                        type='text'
                        {...register("email")}
                        placeholder='Адреса електронної пошти'
                        autoComplete='off'
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <p className={styles.error}>{errors.theme?.message}</p>

                    <input
                        type='text'
                        {...register("theme")}
                        placeholder='Тема'
                        autoComplete='off'
                        className={styles.input}
                    />
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
                <div className={`${styles.inputWrap} ${styles.radioWrap}`}>
                    <p className={styles.error}>{errors.calback?.message}</p>
                    <span>
                        <label htmlFor='telegram'>
                            <svg className={styles.socSvg}>
                                <use
                                    href='/sprite.svg#icon-telegram'
                                    className={styles.socIcon}
                                ></use>
                            </svg>
                        </label>
                        <input
                            type='radio'
                            id='telegram'
                            {...register("calback")}
                            value='Telegram'
                            className={styles.inputRadio}
                        />
                    </span>

                    <span>
                        <label htmlFor='whatsApp'>
                            <svg className={styles.socSvg}>
                                <use
                                    href='/sprite.svg#icon-WhatsApp'
                                    className={styles.socIcon}
                                ></use>
                            </svg>
                        </label>
                        <input
                            id='whatsApp'
                            type='radio'
                            {...register("calback")}
                            value='WhatsApp'
                            className={styles.inputRadio}
                        />
                    </span>

                    <span>
                        <label htmlFor='messenger'>
                            <svg className={styles.socSvg}>
                                <use
                                    href='/sprite.svg#icon-messager'
                                    className={styles.socIcon}
                                ></use>
                            </svg>
                        </label>
                        <input
                            type='radio'
                            {...register("calback")}
                            id='messenger'
                            value='Messenger'
                            className={styles.inputRadio}
                        />
                    </span>

                    <span>
                        <label htmlFor='viber'>
                            <svg className={styles.socSvg}>
                                <use
                                    href='/sprite.svg#icon-viber'
                                    className={styles.socIcon}
                                ></use>
                            </svg>
                        </label>
                        <input
                            type='radio'
                            {...register("calback")}
                            id='viber'
                            value='Viber'
                            className={styles.inputRadio}
                        />
                    </span>
                </div>
                <button
                    type='submit'
                    disabled={isErrors || isSubmitting}
                    className={styles.submitButton}
                >
                    Надіслати заявку
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
