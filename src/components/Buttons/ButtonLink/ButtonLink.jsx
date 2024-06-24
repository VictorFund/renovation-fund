import Link from 'next/link';
import React from 'react';
import styles from './ButtonLink.module.scss';

const ButtonLink = ({ costumBtn, href, title, id }) => {
  return (
    <Link href={href} className={styles.btn + ' ' + costumBtn} id={id}>
      <span>{title}</span>
      <svg className={styles.arrow}>
        <use href="sprite.svg#icon-arrow" />
      </svg>
    </Link>
  );
};

export default ButtonLink;
