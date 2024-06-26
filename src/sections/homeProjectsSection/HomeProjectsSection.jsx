// "use client";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import React from "react";
import styles from "./HomeProjectsSection.module.scss";
import { items } from "../../data/temporryItems";

// import { GetDataForHomeByCollection } from "@/fetch/clientFetch";

const HomeProjectsSection = () => {
  // const { data } = GetDataForHomeByCollection('projects');
  // console.log('projectsData', data)

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2 className="homeSectionTitle">HomeProjects Section</h2>
        <HomeSwiper items={items} />
      </div>
    </section>
  );
};

export default HomeProjectsSection;
