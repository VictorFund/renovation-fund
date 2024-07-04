import { formatDate } from '@/utils/formatDate';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import styles from './ProjectItem.module.scss';

const ProjectItem = ({ slug, title, image, shortDescription, createdAt }) => {
  const formattedDate = formatDate(createdAt);

  return (
    <li className={styles.projectsItem}>
      <Link href={`/projects/${slug}`} className={styles.projectsLink}>
        <div className={styles.contentProject}>
          <h4 className={styles.projectTitle}>{title}</h4>
          <p className={styles.date}>{formattedDate}</p>
          <p className={styles.projectDesc}>{shortDescription}</p>
          {/* <Link href={`/projects/${slug}`} className={styles.btn}>
            Підтримати
          </Link> */}
          <p className={styles.btn}>Детальніше</p>
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
