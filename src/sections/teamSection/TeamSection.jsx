'use client';
import styles from './TeamSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { CldImage } from 'next-cloudinary';

const TeamSection = () => {
  const { data } = GetDataWithPathname();
  const filteredAndSortedData = data?.filter(item => item.isApproved).sort((a, b) => { return a.priority - b.priority })


  return (
    <section className="topSection">
      <div className={`container ${styles.team}`}>
        <h1 className={`sectionTitle ${styles.title}`}>Команда</h1>
        <ul className={styles.teamList}>
          {filteredAndSortedData?.map(({ slug, name, photo, description, isApproved }) => {
            if (isApproved) {
              return (
                <li key={slug} className={styles.teamCard}>
                  <figure className={styles.imgContainer}>
                    <CldImage
                      src={photo}
                      alt={name}
                      fill={true}
                      sizes="(max-width: 768px) 224px, (max-width: 1440px) 432px"
                    />
                  </figure>
                  <div className={styles.content}>
                    <h4 className={styles.contetnTitle}>{name}</h4>
                    <p className={styles.contentDesc}>{description}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
