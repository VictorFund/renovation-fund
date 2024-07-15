"use client"
import SocialLinks from "../SocialLinks/SocialLinks";
import FooterLogo from "./FooterLogo";
import FooterNav from "./FooterNav";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const[isLoad, setIsLoad]=useState(true);
  
  const {t}=useTranslation();

  useEffect(()=>{
    setIsLoad(false)
  },[])

  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.blockWrapp}>
          <div className={styles.logoWrapp}>
            <FooterLogo />
          </div>
          <address className={styles.addr}>
            {!isLoad && <a
              href="https://maps.app.goo.gl/Rh6PxCxxDbAd3p7q6"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.street}
            >
              {t('Footer.AdressCity')},
              <br /> {t('Footer.AdressStreet')}, 21
            </a>}

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
          {!isLoad && <h3>{t('Footer.Contacts')}</h3>}
          <address className={styles.addr}>
            <a href="https://t.me/pvfond_contact" target="_blank">
              @pvfond_contact
            </a>
            <a href="mailto:pvfond@gmail.com" className={styles.email}>
              pvfond@gmail.com
            </a>

            {!isLoad &&<p>9.00 - 19.00 {t('Footer.WorkDays')}</p>}
            <a href="tel:+380971775682">+380971775682</a>
          </address>
        </div>
        <FooterNav
          className={styles.blockWrapp}
          titleClassName={styles.navTitle}
          tabletNavLink={styles.tabletNavLink}
          navWrapp={styles.navWrapp}
        />
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
