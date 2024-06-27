"use client";

import React, { useMemo, useState } from "react";
import styles from "./ProjectsSection.module.scss";
import { GetDataWithPathname } from "@/fetch/clientFetch";
import ProjectItem from "@/components/ProjectItem/ProjectItem";
import { projectsCategories } from "@/data/projectsCategories.data";

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(false);
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

  const currentTab = projectsCategories.find(
    (project) => project.stateTitle === activeTab
  );

  return (
    <section className="topSection">
      <div className={`container ${styles.projects}`}>
        <h1 className={`sectionTitle ${styles.title}`}>Проєкти</h1>
        <div className={styles.btnContainer}>
          <button
            className={styles.accordionTitleContainer}
            type="button"
            onClick={() => setActiveAccordion((prevState) => !prevState)}
          >
            <p className={styles.titleAccordion}>
              {currentTab ? currentTab.title : "Виберіть проєкт"}
            </p>
            <svg
              className={`${styles.arrow} ${
                activeAccordion && styles.activeArrow
              }`}
            >
              <use href="sprite.svg#icon-vector"></use>
            </svg>
          </button>

          <div
            className={` 
                ${styles.accordionBtnContainer} 
                ${
                  activeAccordion ? styles.accordionOpen : styles.accordionClose
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
                    <use href="sprite.svg#icon-checkMark"></use>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.btnContainer}>
          {projectsCategories.map(({ id, title, stateTitle }) => (
            <button
              key={id}
              type="button"
              className={
                activeTab === stateTitle
                  ? styles.btn + " " + styles.active
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
      </div>
    </section>
  );
};
