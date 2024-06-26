// "use client";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import React from "react";
import styles from "./HomeProjectsSection.module.scss";
import { items } from "../../data/temporryItems";

// import { GetDataForHomeByCollection } from "@/fetch/clientFetch";

const HomeProjectsSection = () => {
  // const { data } = GetDataForHomeByCollection('projects');
  // console.log('projectsData', data)
  if (typeof window !== "undefined") {
    console.dir(document?.getElementById("projectsSelect"));
  }

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2 className="homeSectionTitle">HomeProjects Section</h2>
        {/* <div className={styles.selectWrapp}>
          <select className={styles.select} name="pets" id="projectsSelect">
            <option value="announced" selected>
              Анонсовані проєкти
            </option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
          <svg className={`${styles.arrow}`}>
            <use href="sprite.svg#icon-vector"></use>
          </svg>
        </div> */}
        <HomeSwiper items={items} />
      </div>
    </section>
  );
};

export default HomeProjectsSection;
