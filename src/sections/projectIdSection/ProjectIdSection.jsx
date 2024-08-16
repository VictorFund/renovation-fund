"use client";

import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import Loader from "@/components/Loader/Loader";
import ProjectItem from "@/components/ProjectItem/ProjectItem";
import { currentLanguages } from "@/data";
import {
  GetDataForHomeByCollection,
  GetDataWithPathname,
} from "@/fetch/clientFetch";
import { changeStringTypeToArray } from "@/utils/changeStringTypeToArray";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProjectIdSection.module.scss";

const ProjectIdSection = () => {
  const [projectData, setProjectData] = useState([]);
  const { data, isLoading } = GetDataWithPathname();
  console.log("data.link", data?.link);
  const projectlist = GetDataForHomeByCollection("projects");

  const { i18n, t } = useTranslation();

  let changedData = {};
  if (!isLoading) {
    changedData = changeStringTypeToArray(data);
  }

  useEffect(() => {
    if (!projectlist?.isLoading && !projectlist?.error) {
      const filteredData = projectlist.data?.filter(
        (project) => project.slug !== changedData?.slug
      );
      const shuffledData = filteredData.sort(() => 0.5 - Math.random());
      const slicedData = shuffledData.slice(0, 2);
      setProjectData(slicedData);
    }
  }, [
    changedData?.slug,
    projectlist?.isLoading,
    projectlist?.data,
    projectlist?.error,
  ]);

  const desc =
    i18n.language === currentLanguages.EN
      ? changedData?.descriptionEn
      : changedData?.description;

  return (
    <section className="topSection">
      <div className={`container`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className={`sectionTitle ${styles.title}`}>
              {i18n.language === currentLanguages.EN
                ? changedData?.titleEn
                : changedData?.title}
            </h1>
            {data?.startDate && (
              <p className={styles.date}>
                {t("ProjectsIdPage.DateOfStart")}
                {data?.startDate}
              </p>
            )}
            <div
              className={`${styles.contentContainer} ${styles.blockIndentation}`}
            >
              <figure className={styles.imgContainer}>
                {changedData?.image ? (
                  <CldImage
                    src={changedData?.image}
                    alt="фото проекту"
                    fill={true}
                    sizes="(max-width: 768px) 40vw, (max-width: 1440px) 516px"
                  />
                ) : (
                  <Image
                    src={"/images/logoIkon.webp"}
                    alt="фото проекту"
                    fill={true}
                    className="defaultImg"
                    sizes="(max-width: 768px) 40vw, (max-width: 1440px) 516px"
                  />
                )}
              </figure>
              <div className={styles.contentList}>
                {changedData?.sum && (
                  <>
                    <p
                      className={
                        i18n.language === currentLanguages.EN
                          ? styles.purposeCollectionEn +
                            " " +
                            styles.purposeCollection
                          : styles.purposeCollectionUa +
                            " " +
                            styles.purposeCollection
                      }
                    >
                      {t("ProjectsIdPage.Target")}
                      <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-target" />
                      </svg>
                    </p>
                    <p className={styles.price}>
                      {changedData?.sum}
                      {t("ProjectsIdPage.Currency")}
                    </p>
                  </>
                )}
                <ButtonLink
                  href={data.link ? data.link : "/donate"}
                  title={t("Buttons.Donate")}
                  customBtn={
                    changedData?.sum
                      ? styles.btn
                      : styles.btn + " " + styles.btn_sum
                  }
                  target={data.link ? "_blank" : "_self"}
                />
              </div>
            </div>
            <div className={styles.blockIndentation}>
              <h3 className={`sectionTitle ${styles.title}`}>
                {t("ProjectsIdPage.AboutProject")}
              </h3>
              <ul className={styles.aboutList}>
                <li>
                  <span className="accentText">
                    {t("ProjectsIdPage.Mission")}
                  </span>{" "}
                  {i18n.language === currentLanguages.EN
                    ? changedData?.missionEn
                    : changedData?.mission}
                </li>
                <li>
                  <span className="accentText">
                    {t("ProjectsIdPage.TargetOfProject")}
                  </span>{" "}
                  {i18n.language === currentLanguages.EN
                    ? changedData?.goalEn
                    : changedData?.goal}
                </li>
                <li>
                  <span className="accentText">
                    {t("ProjectsIdPage.TargetAudience")}
                  </span>{" "}
                  {i18n.language === currentLanguages.EN
                    ? changedData?.audienceEn
                    : changedData?.audience}
                </li>
                <li>
                  <span className="accentText">
                    {t("ProjectsIdPage.Concept")}
                  </span>{" "}
                  {i18n.language === currentLanguages.EN
                    ? changedData?.conceptEn
                    : changedData?.concept}
                </li>
                <li className={styles.textWrapper}>
                  {desc?.map((item, index) => (
                    <p key={index} className={styles.text}>
                      {item}
                    </p>
                  ))}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`sectionTitle ${styles.title}`}>
                {t("ProjectsIdPage.OtherProjects")}
              </h3>
              <ul className={styles.projectsList}>
                {projectData.map(
                  ({
                    slug,
                    title,
                    titleEn,
                    image,
                    shortDescription,
                    shortDescriptionEn,
                    createdAt,
                  }) => (
                    <ProjectItem
                      key={slug}
                      slug={slug}
                      title={title}
                      titleEn={titleEn}
                      image={image}
                      shortDescription={shortDescription}
                      shortDescriptionEn={shortDescriptionEn}
                      createdAt={createdAt}
                    />
                  )
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectIdSection;
