'use client';

import { useMemo, useState } from 'react';
import styles from './ProjectsSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { projectsCategories } from '@/data/projectsCategories.data';
import { ProjectAccordio } from '@/components/ProjectAccordio/ProjectAccordio';
import Loader from '@/components/Loader/Loader';

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('');
  const { data, isLoading } = GetDataWithPathname();
  console.log(data);

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
        <ProjectAccordio activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.btnContainer}>
          {projectsCategories.map(({ id, title, stateTitle }) => (
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
        {isLoading ? (
          <Loader />
        ) : (
          <ul className={styles.projectsList}>
            {filteredData.map(
              ({ slug, isApproved, title, image, shortDescription }) => {
                if (isApproved) {
                  return (
                    <ProjectItem
                      key={slug}
                      slug={slug}
                      title={title}
                      image={image}
                      shortDescription={shortDescription}
                    />
                  );
                }
              }
            )}
          </ul>
        )}
      </div>
    </section>
  );
};
