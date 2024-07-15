"use client"
import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import styles from './HomeAboutFundSection.module.scss';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HomeAboutFundSection = () => {
  
  const {t}=useTranslation();

  const [isLoad,setIsLoad]=useState(true)

  useEffect(()=>{
    setIsLoad(false)
  },[])

  return (
    <section>
      <div className="container">
      {!isLoad &&<h2 className="homeSectionTitle">{t('MainPage.AboutSectionTitle')}</h2>}
        <div className={styles.aboutContainer}>
          <ul className={styles.contentList}>
            {!isLoad && <><li className={styles.text}>
            {t('MainPage.AboutSectionTitleText')}{' '}
              <span className={styles.textAccent}>
              {t('MainPage.AboutSectionTitleText1')}
              </span>{' '}
              {t('MainPage.AboutSectionText')}
            </li>
            <li className={styles.text}>
              <span className={styles.textAccent}>{t('MainPage.AboutSectionText1')}</span>{' '}
              {t('MainPage.AboutSectionText2')}
            </li></>}
          </ul>
          <div className={styles.btnContainer}>
            <ButtonLink
              href="/partnership"
              title={!isLoad && t('Buttons.ToPartners')}
              customBtn={styles.btn}
            />
            <ButtonLink
              href="/contacts"
              title={!isLoad && t('Buttons.ToPartners')}
              customBtn={styles.btn}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutFundSection;
