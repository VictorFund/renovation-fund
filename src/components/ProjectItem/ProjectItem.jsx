import { currentLanguages } from '@/data';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './ProjectItem.module.scss';

const ProjectItem = ({
  slug,
  title,
  titleEn,
  image,
  shortDescription,
  shortDescriptionEn,
  startDate,
}) => {
  const { i18n, t } = useTranslation();

  return (
    <li className={styles.projectsItem}>
      <Link href={`/projects/${slug}`} className={styles.projectsLink}>
        <div className={styles.contentProject}>
          <h4 className={styles.projectTitle}>
            {i18n.language === currentLanguages.EN ? titleEn : title}
          </h4>
          {startDate && <p className={styles.date}>{startDate}</p>}
          <p className={styles.projectDesc}>
            {i18n.language === currentLanguages.EN
              ? shortDescriptionEn
              : shortDescription}
          </p>
          <p className={styles.btn}>{t('Buttons.Details')}</p>
        </div>
        <figure className={styles.imgContainer}>
          <CldImage
            src={image}
            alt={title}
            fill={true}
            sizes="(max-width: 768px) 239px"
          />
        </figure>
      </Link>
    </li>
  );
};

export default ProjectItem;
