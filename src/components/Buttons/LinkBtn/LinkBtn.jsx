import Link from "next/link";
import React from "react";
import styles from "./LinkBtn.module.scss";

const LinkBtn = ({ title, href, id, className }) => {
  return (
    <Link href={href} className={`${styles.linkBtn} ${className}`} id={id}>
      {title}

      <svg className={styles.icon}>
        <use href="/sprite.svg#icon-btnArrow"></use>
      </svg>
    </Link>
  );
};

export default LinkBtn;
