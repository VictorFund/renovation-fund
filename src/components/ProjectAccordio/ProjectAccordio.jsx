'use client';

import { currentLanguages } from '@/data';
import { projectsCategories } from '@/data/projectsCategories.data';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProjectAccordio.module.scss';

export const ProjectAccordio = ({ activeTab, setActiveTab, className, id }) => {
  const [activeAccordion, setActiveAccordion] = useState(false);

  const { i18n, t } = useTranslation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setActiveAccordion(false);
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
          {currentTab
            ? i18n.language === currentLanguages.EN
              ? currentTab.titleEn
              : currentTab.title
            : i18n.language === currentLanguages.EN
            ? 'Current projects'
            : 'Поточні проєкти'}
          {/* {currentTab ? currentTab.title : 'Поточні проєкти'} */}
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
                ${
                  activeAccordion ? styles.accordionOpen : styles.accordionClose
                }`}
      >
        {projectsCategories.map(({ id, title, titleEn, stateTitle }) => (
          <button
            key={id}
            type="button"
            className={styles.accordionBtnItem}
            onClick={() => {
              handleTabClick(stateTitle);
              setActiveAccordion(false);
            }}
          >
            <span>
              {i18n.language === currentLanguages.EN ? titleEn : title}
            </span>
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
