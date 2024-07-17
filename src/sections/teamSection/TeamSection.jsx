'use client';
import styles from './TeamSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { CldImage } from 'next-cloudinary';
import Loader from '@/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { currentLanguages } from '@/data';

const TeamSection = () => {
  const { data, isLoading } = GetDataWithPathname();

  const { i18n, t } = useTranslation();

  const filteredAndSortedData = data
    ?.filter((item) => item.isApproved)
    .sort((a, b) => {
      return a.priority - b.priority;
    });

  return (
    <section className="topSection">
      <div className={`container ${styles.team}`}>
        <h1 className={`sectionTitle ${styles.title}`}>{!isLoading && t('TeamPage.Title')}</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className={styles.teamList}>
            {filteredAndSortedData?.map(
              ({
                slug,
                name,
                nameEn,
                photo,
                description,
                descriptionEn,
                isApproved,
              }) => {
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
                        <h4 className={styles.contetnTitle}>
                          {i18n.language === currentLanguages.EN
                            ? nameEn
                            : name}
                        </h4>
                        <p className={styles.contentDesc}>
                          {i18n.language === currentLanguages.EN
                            ? descriptionEn
                            : description}
                        </p>
                      </div>
                    </li>
                  );
                }
              }
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
