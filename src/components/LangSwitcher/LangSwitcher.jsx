'use client';

import { useState, useEffect } from 'react';
import styles from './LangSwitcher.module.scss';

const LangSwitcher = ({ changeLanguage, currentLanguage }) => {
  const [isClicked, setIsClicked] = useState(false);
  //  const[lang,setLang]=useState()
  // useEffect(()=>{
  //   setLang(()=>currentLanguage==="en"? "ua" : "en")
  // },[])

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
        onClick={() => changeLanguage(currentLanguage === 'ua' ? 'en' : 'ua')}
      >
        {currentLanguage === 'en' ? 'ua' : 'en'}
        {/* {lang} */}
      </p>
    </div>
  );
};

export default LangSwitcher;
