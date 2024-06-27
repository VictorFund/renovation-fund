// "use client";
import TitleLink from "@/components/Buttons/TitleLink/TitleLink";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import { getData } from "@/fetch/serverFetch";
import React from "react";
import styles from "./HomeProjectsSection.module.scss";

const data = await getData("projects");

const HomeProjectsSection = () => {
  if (typeof window !== "undefined") {
    console.dir(document?.getElementById("projectsSelect"));
  }

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <TitleLink href="/projects" title="Проєкти" />
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
        <HomeSwiper items={data} dataName="projects" />
      </div>
    </section>
  );
};

export default HomeProjectsSection;
