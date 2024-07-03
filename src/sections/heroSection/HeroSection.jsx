'use client';

import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { socialLinks } from '@/data/socialLinks.data';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './heroSection.module.scss';

const HeroSection = () => {
  const [isSmallScreenImg, setIsSmallScreenImg] = useState(false);
  useEffect(() => {
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
          <span>Спільними зусиллями</span>{' '}
          <span className={styles.titleItem}>відбудуємо країну</span>
        </h1>
        <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMini}>
          Благодійний фонд «Перемоги та Відновлення»
        </h3>
        <div className={styles.heroContainer}>
          <div className={styles.contentContainer}>
            <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMaxi}>
              Благодійний фонд «Перемоги та Відновлення»
            </h3>
            <div className={styles.currentProjects}>
              <p className={styles.projectsNumber}>2</p>
              <svg className={styles.svgPluse}>
                <use href="/sprite.svg#icon-plus" />
              </svg>
              <p className={styles.projectsGroup}>
                <span>поточних</span>{' '}
                <span className={styles.projectsGroupItem}>проектів</span>
              </p>
            </div>
            <SocialLinks />
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={
                !isSmallScreenImg ? '/images/hero-fund.webp' : '/images/hero-fund-small.webp'
              }
              alt="hero"
              fill="true"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 910px, 460px"
            />
            <div className={styles.btnContainer}>
              <ButtonLink
                customBtn={styles.customBtn}
                href="/donate"
                title="Підтримати"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
