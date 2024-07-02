"use client";

import { SiteContext } from "@/context/siteContext";
import { useContext, useState } from "react";
import styles from "./LangSwitcher.module.scss";

const LangSwitcher = () => {
  const { currentLang, setCurrentLang } = useContext(SiteContext);

  const [lang, setLang] = useState("EN");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`headerBtnsSmall  ${styles.langSwitchWrapp}`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      <p className={`${styles.currentLang}`}>{currentLang}</p>

      <p
        className={
          isClicked ? `${styles.lang} ${styles.isClicked}` : `${styles.lang}`
        }
        onClick={() => {
          setCurrentLang((prev) => (prev === "UA" ? "EN" : "UA"));
          setLang((prev) => (prev === "UA" ? "EN" : "UA"));
        }}
      >
        {lang}
      </p>
    </div>
  );
};

export default LangSwitcher;
