'use client';

import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import Loader from '@/components/Loader/Loader';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { changeStringTypeToArray } from '@/utils/changeStringTypeToArray';
import { formatDate } from '@/utils/formatDate';
import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './ProjectIdSection.module.scss';

const ProjectIdSection = () => {
  const [projectData, setProjectData] = useState([]);
  const { data, isLoading } = GetDataWithPathname();

  let changedData = {};
  if (!isLoading) {
    changedData = changeStringTypeToArray(data);
  }

  const formattedDate = formatDate(changedData?.createdAt);

  const GetData = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    return useSWR(`/api/projects`, fetcher);
  };
  const projectlist = GetData();

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

  return (
    <section className="topSection">
      <div className={`container`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className={`sectionTitle ${styles.title}`}>
              {changedData?.title}
            </h1>
            <p className={styles.date}>Початок проекту: {formattedDate}</p>
            <div
              className={`${styles.contentContainer} ${styles.blockIndentation}`}
            >
              <figure className={styles.imgContainer}>
                <CldImage
                  src={changedData?.image}
                  alt="фото проекту"
                  fill={true}
                  sizes="(max-width: 768px) 40vw, (max-width: 1440px) 516px"
                />
              </figure>
              <div className={styles.contentList}>
                <p className={styles.purposeCollection}>
                  Ціль збору
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-target" />
                  </svg>
                </p>
                <p className={styles.price}>{changedData?.sum}</p>
                <ButtonLink
                  href="/donate"
                  title="Задонатити"
                  customBtn={styles.btn}
                />
              </div>
            </div>
            <div className={styles.blockIndentation}>
              <h3 className={`sectionTitle ${styles.title}`}>Про проєкт</h3>
              <ul className={styles.aboutList}>
                <li>
                  <span className="accentText">МІСІЯ:</span>{' '}
                  {changedData?.mission}
                </li>
                <li>
                  <span className="accentText">МЕТА:</span> {changedData?.goal}
                </li>
                <li>
                  <span className="accentText">ЦІЛЬОВА АУДИТОРІЯ:</span>{' '}
                  {changedData?.audience}
                </li>
                <li>
                  <span className="accentText">КОНЦЕПТ:</span>{' '}
                  {changedData?.concept}
                </li>
                <li className={styles.textWrapper}>
                  {changedData.description.map((item, index) => (
                    <p key={index} className={styles.text}>
                      {item}
                    </p>
                  ))}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`sectionTitle ${styles.title}`}>Інші проєкти</h3>
              <ul className={styles.projectsList}>
                {projectData.map(
                  ({ slug, title, image, shortDescription, createdAt }) => (
                    <ProjectItem
                      key={slug}
                      slug={slug}
                      title={title}
                      image={image}
                      shortDescription={shortDescription}
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
