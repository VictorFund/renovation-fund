"use client";
import SocialLinks from "../SocialLinks/SocialLinks";
import FooterLogo from "./FooterLogo";
import FooterNavBlock from "./FooterNavBlock";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { contactsData } from "@/data";

const Footer = () => {
  const [isLoad, setIsLoad] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    setIsLoad(false);
  }, []);

  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.blockWrapp}>
          <div className={styles.logoWrapp}>
            <FooterLogo />
          </div>
          <address className={styles.addr}>
            {!isLoad && (
              <a
                href={contactsData[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.street}
              >
                {t("Footer.AdressCity")},
                <br /> {t("Footer.AdressStreet")}, 60
              </a>
            )}

            <SocialLinks id={styles.socLinks} costumSvg={styles.costumSvg} />
          </address>
          <div className={styles.paymentLogoWrapp}>
            <figure className={styles.paymentLogo}>
              <Image
                src="/images/mastercard.webp"
                alt="mastercard"
                fill
                sizes="10vw"
              />
            </figure>
            <figure className={styles.paymentLogo}>
              <Image
                src="/images/visa.webp"
                alt="mastercard"
                fill
                sizes="10vw"
              />
            </figure>
          </div>
        </div>

        <div className={styles.blockWrapp}>
          {!isLoad && <h3>{t("Footer.Contacts")}</h3>}
          <address className={styles.addr}>
            <a href={contactsData[3].href} target="_blank">
              {contactsData[3].text}
            </a>

            <a href={contactsData[2].href} className={styles.email}>
              {contactsData[2].text}
            </a>

            {!isLoad && <p>9.00 - 19.00 {t("Footer.WorkDays")}</p>}
            <a href={contactsData[1].href}>{contactsData[1].text}</a>
          </address>
        </div>

        {!isLoad && (
          <FooterNavBlock
            className={styles.blockWrapp}
            titleClassName={styles.navTitle}
            tabletNavLink={styles.tabletNavLink}
            navWrapp={styles.navWrapp}
          />
        )}
      </div>

      <div className={styles.allRights}>
        <p>&copy; All rights reserved by</p>
        <a href="https://www.webevery.dev/" target="_blank">
          Webevery.dev
        </a>
        <p>2024</p>
      </div>
    </footer>
  );
};

export default Footer;
