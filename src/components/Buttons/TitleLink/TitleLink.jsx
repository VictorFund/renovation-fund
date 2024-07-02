import Link from "next/link";
import styles from "./TitleLink.module.scss";


const TitleLink = ({ title, href, id }) => {
  return (
    <Link href={href} className={`${styles.link}`} id={id}>
      <h2 className="homeSectionTitle ">{title}</h2>

      <svg className={styles.icon}>
        <use href="/sprite.svg#icon-arrow"></use>
      </svg>
    </Link>
  );
};


export default TitleLink;