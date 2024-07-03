"use client";

import Image from "next/image";
import FeedbackForm from "@/components/Forms/FeedbackForm";
import { useWindowResize } from "@/hooks/useWindowResize";
import { contactsData } from "@/data/contactsData";

import styles from "./ContactSection.module.scss";

const ContactsSection = () => {
    const { isMobile } = useWindowResize();
    return (
        <section className='topSection'>
            <div className={`container ${styles.contactWrap}`}>
                <h1 className={`sectionTitle ${styles.contactTitle}`}>
                    Контакти
                </h1>
                <ul className={styles.contactList}>
                    {contactsData.map((data) => (
                        <li key={data.id} className={styles.contactItem}>
                            <svg className={styles.contactSvg}>
                                <use href={`/sprite.svg#${data.src}`}></use>
                            </svg>
                            <p className={styles.contactText}>{data.text}</p>
                        </li>
                    ))}
                </ul>
                <div className={styles.formBox}>
                    <FeedbackForm />
                    {!isMobile && (
                        <div className={styles.imgWrapper}>
                            <Image
                                width={497}
                                height={473}
                                src='/images/formImg.webp'
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
