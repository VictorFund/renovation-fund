'use client';

import { projectsCategories } from '@/data/projectsCategories.data';
import { useState } from 'react';
import styles from './ProjectAccordio.module.scss';

export const ProjectAccordio = ({ activeTab, setActiveTab, className, id }) => {
  const [activeAccordion, setActiveAccordion] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const currentTab = projectsCategories.find(
    (project) => project.stateTitle === activeTab
  );

  return (
    <div className={`${styles.btnContainer} ${className}`} id={id}>
      <button
        className={styles.accordionTitleContainer}
        type="button"
        onClick={() => setActiveAccordion((prevState) => !prevState)}
      >
        <p className={styles.titleAccordion}>
          {currentTab ? currentTab.title : 'Виберіть проєкт'}
        </p>
        <svg
          className={`${styles.arrow} ${activeAccordion && styles.activeArrow}`}
        >
          <use href="/sprite.svg#icon-vector"></use>
        </svg>
      </button>

      <div
        className={` 
                ${styles.accordionBtnContainer} 
                ${activeAccordion ? styles.accordionOpen : styles.accordionClose
          }`}
      >
        {projectsCategories.map(({ id, title, stateTitle }) => (
          <button
            key={id}
            type="button"
            className={styles.accordionBtnItem}
            onClick={() => {
              handleTabClick(stateTitle);
              setActiveAccordion(false);
            }}
          >
            <span>{title}</span>
            {activeTab === stateTitle && (
              <svg className={styles.checkin}>
                <use href="/sprite.svg#icon-checkMark"></use>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
