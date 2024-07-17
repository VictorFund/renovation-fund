'use client';

import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import styles from './heroSection.module.scss';

const HeroSection = () => {
  const {t}= useTranslation();
  const [isLoad, setIsLoad]=useState(true)
  const [isSmallScreenImg, setIsSmallScreenImg] = useState(false);
  useEffect(() => {
  setIsLoad(false)
    const handleResize = () => {
      setIsSmallScreenImg(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
      }, []);
  return (
    <section className="topSection">
      <div className={`container ${styles.hero}`}>
        <h1 className={styles.title}>
          {!isLoad && <><span>{t('MainPage.HeroTitle')}</span>{' '}
          <span className={styles.titleItem}>{t('MainPage.HeroTitle1')}</span></>}
        </h1>
        {!isLoad && <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMini}>
          {t('MainPage.HeroSubTitle')}
        </h3>}
        <div className={styles.heroContainer}>
          <div className={styles.contentContainer}>
          {!isLoad && <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMaxi}>
          {t('MainPage.HeroSubTitle')}
            </h3>}
            <div className={styles.currentProjects}>
              <p className={styles.projectsNumber}>2</p>
              <svg className={styles.svgPluse}>
                <use href="/sprite.svg#icon-plus" />
              </svg>
              <p className={styles.projectsGroup}>
                {!isLoad && <><span>{t('MainPage.HeroProjectsText')}</span>{' '}
                <span className={styles.projectsGroupItem}>{t('MainPage.HeroProjectsText1')}</span></>}
              </p>
            </div>
            <SocialLinks costumSvg={styles.socialLinks} />
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={
                !isSmallScreenImg
                  ? '/images/hero-fund.webp'
                  : '/images/hero-fund-small.webp'
              }
              alt="hero"
              fill="true"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 910px, 460px"
            />
            <div className={styles.btnContainer}>
              <ButtonLink
                customBtn={styles.customBtn}
                href="/donate"
                title={!isLoad && t("Buttons.Donate")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
