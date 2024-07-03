'use client';
import styles from './PartnershipSection.module.scss';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { CldImage } from 'next-cloudinary';

const PartnershipSection = () => {
  const { data } = GetDataWithPathname('partnership');
  // console.log('data', data);

  return (
    <section className="topSection">
      <div className={`container`}>
        <h1 className={`sectionTitle ${styles.title}`}>Партнерство</h1>

        <ul className={styles.partnershipList}>
          {data?.map(
            ({ slug, title, siteLink, logo, isApproved, isMainPartner }) => {
              if (isApproved) {
                if (isMainPartner) {
                  return (
                    <li key={slug}>
                      <a
                        href={siteLink}
                        target="_blank"
                        aria-label={title}
                        className={styles.partnershipItem}
                      >
                        <figure className={styles.imgContainer}>
                          <CldImage
                            src={logo}
                            alt={title}
                            fill={true}
                            sizes="(max-width: 768px) 128px, (max-width: 1440px) 100px"
                          />
                        </figure>
                        <h3 className={styles.partnershipTitle}>{title}</h3>
                        <p className={styles.btn}>
                          <span>Детальніше</span>
                          <svg className={styles.arrow}>
                            <use href="/sprite.svg#icon-arrow" />
                          </svg>
                        </p>
                      </a>
                    </li>
                  );
                }
              }
            }
          )}
        </ul>
        <ul className={styles.partnershipSmallList}>
          {data?.map(
            ({ slug, title, siteLink, logo, isApproved, isMainPartner }) => {
              if (isApproved) {
                if (!isMainPartner) {
                  return (
                    <li key={slug}>
                      <a
                        href={siteLink}
                        target="_blank"
                        aria-label={title}
                        className={styles.partnershipSmallItem}
                      >
                        <figure className={styles.imgSmallContainer}>
                          <CldImage
                            src={logo}
                            alt={title}
                            fill={true}
                            sizes="(max-width: 768px) 75px"
                          />
                        </figure>
                        <h3 className={styles.partnershipSmallTitle}>
                          {title}
                        </h3>
                      </a>
                    </li>
                  );
                }
              }
            }
          )}
        </ul>
      </div>
    </section>
  );
};

export default PartnershipSection;
