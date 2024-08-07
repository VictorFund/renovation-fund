'use client';

import { useState } from 'react';
import styles from './ProjectsSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { projectsCategories } from '@/data/projectsCategories.data';
import { ProjectAccordio } from '@/components/ProjectAccordio/ProjectAccordio';
import Loader from '@/components/Loader/Loader';
import { useFilterData } from '@/hooks/useFilterData';
import { useTranslation } from 'react-i18next';
import { currentLanguages } from '@/data';

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('Поточний');
  const { data, isLoading } = GetDataWithPathname();

  const { i18n, t } = useTranslation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredData = useFilterData(data, activeTab);

  return (
    <section className="topSection">
      <div className={`container ${styles.projects}`}>
        <h1 className={`sectionTitle ${styles.title}`}>
          {!isLoading && t('ProjectsPage.Title')}
        </h1>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ProjectAccordio
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className={styles.btnContainer}>
              {projectsCategories?.map(({ id, title, titleEn, stateTitle }) => (
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
                  {i18n.language === currentLanguages.EN ? titleEn : title}
                </button>
              ))}
            </div>

            <ul className={styles.projectsList}>
              {filteredData.map(
                ({
                  slug,
                  isApproved,
                  title,
                  titleEn,
                  image,
                  shortDescription,
                  shortDescriptionEn,
                  startDate,
                }) => {
                  if (isApproved) {
                    return (
                      <ProjectItem
                        key={slug}
                        slug={slug}
                        title={title}
                        titleEn={titleEn}
                        image={image}
                        shortDescription={shortDescription}
                        shortDescriptionEn={shortDescriptionEn}
                        startDate={startDate}
                      />
                    );
                  }
                }
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};
