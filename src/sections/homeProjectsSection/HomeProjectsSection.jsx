"use client";
import TitleLink from "@/components/Buttons/TitleLink/TitleLink";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import { ProjectAccordio } from "@/components/ProjectAccordio/ProjectAccordio";
import { GetDataForHomeByCollection } from "@/fetch/clientFetch";
import { useFilterData } from "@/hooks/useFilterData";
import { useWindowResize } from "@/hooks/useWindowResize";

import { useState } from "react";

import styles from "./HomeProjectsSection.module.scss";

const HomeProjectsSection = () => {
  const { data, isLoading } = GetDataForHomeByCollection("projects");
  const [activeTab, setActiveTab] = useState("Поточний");
  const { isMobile } = useWindowResize();

  const aprovedData = data?.filter((el) => el.isApproved);


  const filteredData = useFilterData(aprovedData, activeTab);


  return (
    <section>
      <div className={`container ${styles.container}`}>
        <TitleLink href="/projects" title="Проєкти" id={styles.title} />

        {isMobile && (
          <ProjectAccordio
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id={styles.accordion}
          />
        )}

        <HomeSwiper
          items={filteredData}
          dataName="projects"
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default HomeProjectsSection;
