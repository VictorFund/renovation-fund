"use client";

import Image from "next/image";
import { contactsData, currentLanguages } from "@/data";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useState, useEffect } from "react";
import FeedbackForm from "@/components/Forms/FeedbackForm";
import { useTranslation } from "react-i18next";
import styles from "./ContactsSection.module.scss";

const ContactsSection = () => {
  const { isMobile, isDesktop } = useWindowResize();

  const [isLoad, setIsLoad] = useState(true);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    setIsLoad(false);
  }, []);

  return (
    <section className="topSection">
      <div className={`container ${styles.contactWrap}`}>
        <h1 className={`sectionTitle ${styles.contactTitle}`}>
          {!isLoad && t("ContactsPage.Title")}
        </h1>
        <div className={styles.contactBox}>
          <iframe
            className={styles.iframe}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.2702060712386!2d30.533308899999998!3d50.3801613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c61d7b54a8e5%3A0xfc1760b115e139f4!2z0L_RgNC-0YHQvy4g0J3QsNGD0LrQuCwgNjAsINCa0LjQtdCyLCAwMjAwMA!5e0!3m2!1sru!2sua!4v1722274270221!5m2!1sru!2sua"
          ></iframe>

          <ul className={styles.contactList}>
            {contactsData.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.contactLink}
                  target="_blank"
                >
                  <svg className={styles.contactSvg}>
                    <use href={`/sprite.svg#${item.src}`}></use>
                  </svg>
                  {!isLoad && (
                    <p className={styles.contactText}>
                      {i18n.language === currentLanguages.EN && item.textEn
                        ? item.textEn
                        : item.text}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {isDesktop && (
          <div className={styles.descriptionBox}>
            <p className={styles.description}>
              {!isLoad && t("ContactsPage.Text")}
            </p>

            <p className={styles.description}>
              {!isLoad && t("ContactsPage.PrivacyPolicy")}{" "}
              <a
                href="http://surl.li/tleax"
                className={styles.descriptionLink}
                target="_blank"
              >
                http://surl.li/tleax
              </a>
            </p>
          </div>
        )}
        <div className={styles.formBox}>
          {!isLoad && <FeedbackForm />}
          {!isMobile && (
            <div className={styles.imgWrapper}>
              <Image
                width={497}
                height={473}
                src="/images/FormImage.webp"
                alt="Two happy people at work"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
