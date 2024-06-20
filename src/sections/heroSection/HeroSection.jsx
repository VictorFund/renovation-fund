'use client';

import Button from '@/components/Buttons/Button/Button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './heroSection.module.scss';

const socialLinks = [
  {
    id: 1,
    src: 'icon-telegram',
    href: '#',
  },
  {
    id: 2,
    src: 'icon-WhatsApp',
    href: '#',
  },
  {
    id: 3,
    src: 'icon-messager',
    href: '#',
  },
  {
    id: 4,
    src: 'icon-viber',
    href: '#',
  },
];

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
          <span>Запалимо вогонь</span>{' '}
          <span className={styles.titleItem}>Державотворчий!</span>
        </h1>
        <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMini}>
          Благодійний фонд Перемоги та Відновлення
        </h3>
        <div className={styles.contentContainer}>
          <div className={styles.infoContainer}>
            <h3 className={styles.heroSubtitle + ' ' + styles.heroSubtitleMaxi}>
              Благодійний фонд Перемоги та Відновлення
            </h3>
            <div className={styles.statistics}>
              <p className={styles.number}>2</p>
              <svg className={styles.svgPluse}>
                <use href="sprite.svg#icon-plus" />
              </svg>
              <p className={styles.contentGroup}>
                <span>поточних</span>{' '}
                <span className={styles.contentGroupItem}>проектів</span>
              </p>
            </div>
            <ul className={styles.socialList}>
              {socialLinks.map(({ id, src, href }) => (
                <li key={id}>
                  <a href={href}>
                    <svg className={styles.svgSocialLink}>
                      <use href={`sprite.svg#${src}`} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={
                !isSmallScreenImg ? '/hero-fund.webp' : '/hero-fund-small.webp'
              }
              alt="hero"
              fill="true"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 910px, 460px"
            />
            <div className={styles.btnContainer}>
              <Button costumBtn={styles.costumBtn} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
