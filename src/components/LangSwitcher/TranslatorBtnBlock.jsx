"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

const TranslatorBtnBlock = ({ translatorUk, translatorEn }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    (prev) =>
    !prev || prev === undefined ? "ua" : prev
  );

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    // console.log(lang)
    setLanguage(() => (lang ? lang : "ua"));
    // setLanguage(() => ( lang=== "ua" ? "ua" : "en"));
    setIsLoad(false);
  
  }, [language]);

 
  const changeLanguage = (languageUser) => {
    localStorage.setItem("i18nextLng", languageUser);
    const language = localStorage.getItem("i18nextLng");
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <>
      {!isLoad && (
        <LangSwitcher
          changeLanguage={changeLanguage}
          currentLanguage={language}
          translatorUk={translatorUk}
          translatorEn={translatorEn}
        />
      )}
    </>
  );
};

export default TranslatorBtnBlock;
