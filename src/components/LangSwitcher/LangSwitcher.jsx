"use client";

import { SiteContext } from "@/context/siteContext";
import { useContext, useState } from "react";
import styles from "./LangSwitcher.module.scss";

const LangSwitcher = ({ id }) => {
  const [currentLang, setCurrentLang] = useState("ua");

  const [lang, setLang] = useState("en");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`headerBtnsSmall  ${styles.langSwitchWrapp}`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
      id={id}
    >
      <p className={`${styles.currentLang}`}>{currentLang}</p>

      <p
        className={
          isClicked ? `${styles.lang} ${styles.isClicked}` : `${styles.lang}`
        }
        onClick={() => {
          setLang((prev) => (prev === "ua" ? "en" : "ua"));
          setCurrentLang((prev) => (prev === "en" ? "ua" : "en"));
        }}
      >
        {lang}
      </p>
    </div>
  );
};

export default LangSwitcher;
