import SocialLinks from "../SocialLinks/SocialLinks";
import FooterLogo from "./FooterLogo";
import FooterNav from "./FooterNav";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.blockWrapp}>
          <div className={styles.logoWrapp}>
            <FooterLogo />
          </div>
          <address className={styles.addr}>
            <a
              href="https://maps.app.goo.gl/Rh6PxCxxDbAd3p7q6"
              target="_blank"
              rel="noopener noreferrer"
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
            <a
              href="mailto:pvfond@gmail.com"
              className={styles.email}
            >
              pvfond@gmail.com
            </a>

            <p>9.00 - 19.00 Пн-Пт</p>
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
