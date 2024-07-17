"use client";

import { useState } from "react";
import styles from "./LangSwitcher.module.scss";

const LangSwitcher = ({ changeLanguage,
  currentLanguage, }) => {

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`headerBtnsSmall  ${styles.langSwitchWrapp}`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
      // id={id}
    >
      <p className={`${styles.currentLang}`}>{currentLanguage}</p>

      <p
        className={
          isClicked ? `${styles.lang} ${styles.isClicked}` : `${styles.lang}`
        }
        onClick={()=> changeLanguage(currentLanguage==="ua" ?"en" : "ua")}
      >
        {currentLanguage==="en"? "ua" : "en"}
      </p>
    </div>
  );
};

export default LangSwitcher;
