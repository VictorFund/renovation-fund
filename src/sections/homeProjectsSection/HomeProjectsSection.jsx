"use client";
import TitleLink from "@/components/Buttons/TitleLink/TitleLink";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import Loader from "@/components/Loader/Loader";
import { ProjectAccordio } from "@/components/ProjectAccordio/ProjectAccordio";
import { GetDataForHomeByCollection } from "@/fetch/clientFetch";
import { useFilterDate } from "@/hooks/useFilterDate";

import { useState } from "react";

import styles from "./HomeProjectsSection.module.scss";

const HomeProjectsSection = () => {
  const { data, isLoading } = GetDataForHomeByCollection("projects");
  const [activeTab, setActiveTab] = useState("");

  const aprovedData = data?.map((el) => {
    if (el.isApproved) {
      return el;
    } else {
      return;
    }
  });

  const filteredData = useFilterDate(aprovedData, activeTab);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <TitleLink href="/projects" title="Проєкти" />
        <ProjectAccordio activeTab={activeTab} setActiveTab={setActiveTab} />
        {isLoading ? (
          <Loader />
        ) : (
          <HomeSwiper items={filteredData} dataName="projects" />
        )}
      </div>
    </section>
  );
};

export default HomeProjectsSection;
