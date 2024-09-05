'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher';

const TranslatorBtnBlock = () => {
  const { i18n } = useTranslation();
  
  const [language, setLanguage] = useState("uk")
  const [isLoad, setIsLoad] = useState(true);
  
  useEffect(() => {
    const previosLang= localStorage.getItem('previosLng')
    const browserLang=localStorage.getItem('i18nextLng')
    
    const lang=()=>
    {if (previosLang){return previosLang} else if ((browserLang ==="ru") || (browserLang=== "uk")) {return "uk"} else {return "en"}}
    setLanguage(lang())
    i18n.changeLanguage(lang())

    setIsLoad(false);
    }, []);

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setLanguage(lang);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (languageUser) => {
    localStorage.setItem('previosLng', languageUser==="en"? "en" : "uk");
    i18n.changeLanguage(languageUser==="en"? "en" : "uk");
    
  };

  return (
    <>
      {!isLoad && (
        <LangSwitcher
          changeLanguage={changeLanguage}
          currentLanguage={language}
        />
      )}
    </>
  );
};

export default TranslatorBtnBlock;
