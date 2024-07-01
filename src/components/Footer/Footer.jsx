import React from "react";
import Logo from "../Logo/Logo";
import SocialLinks from "../SocialLinks/SocialLinks";
import styles from "./Footer.module.scss";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.blockWrapp}>
          <Logo id={styles.logo} />
          <address className={styles.addr}>
            <a
              href="https://maps.app.goo.gl/Rh6PxCxxDbAd3p7q6"
              target="_blank"
              className={styles.street}
            >
              м.Київ,
              <br /> вул. Княжий Затон, 21
            </a>

            <SocialLinks id={styles.socLinks} />
          </address>
        </div>

        <div className={styles.blockWrapp}>
          <h3>Контакти</h3>
          <address className={styles.addr}>
            <a href="https://t.me/pvfond_contact" target="_blank">
              @pvfond_contact
            </a>
            <a href="mailto:peremogividnovlenna@gmail.com">
              peremogividnovlenna <br />
              @gmail.com
            </a>

            <p>9.00 - 19.00 Пн-Пт</p>
            <a href="tel:+380971775682">+380971775682</a>
          </address>
        </div>
        <FooterNav
          className={styles.blockWrapp}
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
