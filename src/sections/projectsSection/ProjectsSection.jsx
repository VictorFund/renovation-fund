'use client';

import React, { useMemo, useState } from 'react';
import styles from './ProjectsSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import ProjectItem from '@/components/ProjectItem/ProjectItem';

const radioBtnProject = [
  {
    id: 1,
    stateTitle: 'Announced',
    title: 'Анонсовані проєкти',
  },
  {
    id: 2,
    stateTitle: 'Current',
    title: 'Поточні проєкти',
  },
  {
    id: 3,
    stateTitle: 'Completed',
    title: 'Реалізовані проєкти',
  },
];

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('');
  const { data } = GetDataWithPathname();
  // console.log('data', data);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter(({ state }) => !activeTab || state === activeTab)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data, activeTab]);

  return (
    <section className="topSection">
      <div className={`container ${styles.projects}`}>
        <h1 className={`sectionTitle ${styles.title}`}>Проєкти</h1>
        <div className={styles.btnContainer}>
          {radioBtnProject.map(({ id, title, stateTitle }) => (
            <button
              key={id}
              type="button"
              className={
                activeTab === stateTitle
                  ? styles.btn + ' ' + styles.active
                  : styles.btn
              }
              onClick={() => handleTabClick(stateTitle)}
            >
              {title}
            </button>
          ))}
        </div>
        <ul className={styles.projectsList}>
          {filteredData.map(
            ({ slug, isApproved, title, image, shortDescription }) => {
              if (isApproved) {
                return (
                  <ProjectItem
                    key={slug}
                    title={title}
                    image={image}
                    shortDescription={shortDescription}
                  />
                );
              }
            }
          )}
        </ul>
      </div>
    </section>
  );
};
