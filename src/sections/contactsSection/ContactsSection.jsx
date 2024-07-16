"use client";

import Image from "next/image";
import { contactsData, currentLanguages } from "@/data";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useState, useEffect } from "react";
import FeedbackForm from "@/components/Forms/FeedbackForm";
import { useTranslation } from "react-i18next";
import styles from "./ContactSection.module.scss";

const ContactsSection = () => {
    const { isMobile, isDesktop } = useWindowResize();
    
    const [isLoad,setIsLoad]=useState(true);

    const {i18n,t}=useTranslation();

    useEffect(()=>{
        setIsLoad(false)
    },[])

    return (
        <section className='topSection'>
            <div className={`container ${styles.contactWrap}`}>
                <h1 className={`sectionTitle ${styles.contactTitle}`}>
                    {!isLoad && t('ContactsPage.Title')}
                </h1>
                <div className={styles.contactBox}>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.2636003354446!2d30.53102365791931!3d50.38028445006989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c61d7b54a8e5%3A0xfc1760b115e139f4!2z0L_RgNC-0YHQv9C10LrRgiDQndCw0YPQutC4LCA2MCwg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1720014348108!5m2!1suk!2sua'
                        className={styles.iframe}
                        loading='lazy'
                    ></iframe>
                    <ul className={styles.contactList}>
                        {contactsData.map((data) => (
                            <li key={data.id}>
                                <a
                                    href={data.href}
                                    className={styles.contactLink}
                                    target='_blank'
                                >
                                    <svg className={styles.contactSvg}>
                                        <use
                                            href={`/sprite.svg#${data.src}`}
                                        ></use>
                                    </svg>
                                    {!isLoad && <p className={styles.contactText}>
                                        {i18n.language===currentLanguages.EN && data.textEn ? data.textEn : data.text}
                                    </p>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {isDesktop && (
                    <div className={styles.descriptionBox}>
                        <p className={styles.description}>
                            {!isLoad && t('ContactsPage.Text')}
                        </p>

                        <p className={styles.description}>
                            {!isLoad && t('ContactsPage.PrivacyPolicy')}{" "}
                            <a
                                href='http://surl.li/tleax'
                                className={styles.descriptionLink}
                                target='_blank'
                            >
                                http://surl.li/tleax
                            </a>
                        </p>
                    </div>
                )}
                <div className={styles.formBox}>
                    <FeedbackForm />
                    {!isMobile && (
                        <div className={styles.imgWrapper}>
                            <Image
                                width={497}
                                height={473}
                                src='/images/FormImage.webp'
                                alt='Two happy people at work'
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactsSection;
