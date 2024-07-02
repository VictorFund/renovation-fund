import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import styles from './ProjectItem.module.scss';


const ProjectItem = ({ slug, title, image, shortDescription }) => {
  return (
    <li className={styles.projectsItem}>
      <figure className={styles.imgContainer}>
        <CldImage src={image} alt={title} fill={true} />
      </figure>
      <div className={styles.contentProject}>
        <h4 className={styles.projectTitle}>{title}</h4>
        <p className={styles.projectDesc}>{shortDescription}</p>
        <Link href={`/projects/${slug}`} className={styles.btn}>
          Підтримати
        </Link>
      </div>
    </li>
  );
};

export default ProjectItem;
