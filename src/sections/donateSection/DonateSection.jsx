"use client";

import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import { SiteContext } from "@/context/siteContext";
import { bankAccDetails } from "@/data";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DonateSection.module.scss";

const DonateSection = () => {
  const { isLoad } = useContext(SiteContext);
  const { t } = useTranslation();
  return (
    <section className={`pageSection ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <ul className={styles.linksList}>
          {bankAccDetails.map((el) => {
            return (
              <li key={el.title} className={styles.linkWrapp}>
                <h2 className={styles.title}>{el.title}</h2>
                <ButtonLink
                  href={el.href}
                  title={!isLoad && t("Buttons.Donate")}
                  id={styles.link}
                  target="_blank"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DonateSection;
