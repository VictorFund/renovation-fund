'use client';

import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import Loader from '@/components/Loader/Loader';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { formatDate } from '@/utils/formatDate';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './ProjectIdSection.module.scss';

const ProjectIdSection = () => {
  const [projectData, setProjectData] = useState([]);
  const { data, isLoading } = GetDataWithPathname();

  const formattedDate = formatDate(data?.createdAt);

  const GetData = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    return useSWR(`/api/projects`, fetcher);
  };
  const projectlist = GetData();

  useEffect(() => {
    if (!projectlist.isLoading && !projectlist.error) {
      const filteredData = projectlist.data?.filter(
        (project) => project.slug !== data?.slug
      );
      const shuffledData = filteredData.sort(() => 0.5 - Math.random());
      const slicedData = shuffledData.slice(0, 2);
      setProjectData(slicedData);
    }
  }, [data?.slug, projectlist?.isLoading, projectlist?.data]);

  return (
    <section className="topSection">
      <div className={`container`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className={`sectionTitle ${styles.title}`}>
              Проєкт {data?.title}
            </h1>
            <p className={styles.date}>Початок проекту: {formattedDate}</p>
            <div
              className={`${styles.contentContainer} ${styles.blockIndentation}`}
            >
              <figure className={styles.imgContainer}>
                <CldImage src={data?.image} alt="фото проекту" fill={true} />
              </figure>
              <div className={styles.contentList}>
                <p className={styles.purposeCollection}>
                  Ціль збору
                  <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-target" />
                  </svg>
                </p>
                <p className={styles.price}>{data?.sum}</p>
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
                  <span className="accentText">МІСІЯ:</span> {data?.mission}
                </li>
                <li>
                  <span className="accentText">МЕТА:</span> {data?.goal}
                </li>
                <li>
                  <span className="accentText">ЦІЛЬОВА АУДИТОРІЯ:</span>{' '}
                  {data?.audience}
                </li>
                <li>
                  <span className="accentText">КОНЦЕПТ:</span> {data?.concept}
                </li>
                <li>{data?.description}</li>
              </ul>
            </div>
            <div>
              <h3 className={`sectionTitle ${styles.title}`}>Інші проєкти</h3>
              <ul className={styles.projectsList}>
                {projectData.map(({ slug, title, image, shortDescription }) => (
                  <ProjectItem
                    key={slug}
                    slug={slug}
                    title={title}
                    image={image}
                    shortDescription={shortDescription}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectIdSection;
