'use client';

import React from 'react';
import styles from './TeamSection.module.scss';
import { GetDataForHomeByCollection } from '@/fetch/clientFetch';
import { CldImage } from 'next-cloudinary';

const TeamSection = () => {
  const { data } = GetDataForHomeByCollection('team');
  console.log('data', data);

  return (
    <section className="topSection">
      <div className={`container ${styles.team}`}>
        <h1 className={`sectionTitle ${styles.title}`}>Команда</h1>
        <ul className={styles.teamList}>
          {data?.map(({ slug, name, photo, description, isApproved }) => {
            if (isApproved) {
              return (
                <li key={slug} className={styles.teamCard}>
                  <figure className={styles.imgContainer}>
                    <CldImage src={photo} alt={name} fill={true} />
                  </figure>
                  <div className={styles.content}>
                    <h4 className={styles.contetnTitle}>{name}</h4>
                    <p className={styles.contentDesc}>{description}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
