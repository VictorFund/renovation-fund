'use client';

import { useState, useEffect } from 'react';
import styles from './LangSwitcher.module.scss';

const LangSwitcher = ({ changeLanguage, currentLanguage }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <div
      className={`headerBtnsSmall  ${styles.langSwitchWrapp}`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      <p className={`${styles.currentLang}`}>{currentLanguage=== ('uk' || 'ru') ? 'ua' : 'en'}</p>

      <p
        className={
          isClicked ? `${styles.lang} ${styles.isClicked}` : `${styles.lang}`
        }
        onClick={() => changeLanguage(currentLanguage === 'uk' ? 'en' : 'ua')}
      >
        {currentLanguage === 'en' ? 'ua' : 'en'}
      </p>
    </div>
  );
};

export default LangSwitcher;
