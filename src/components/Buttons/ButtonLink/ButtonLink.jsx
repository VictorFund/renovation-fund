import Link from 'next/link';
import React from 'react';
import styles from './ButtonLink.module.scss';

const ButtonLink = ({ customBtn, href, title, id, target, rel }) => {
  return (
    <Link href={href} className={styles.btn + ' ' + customBtn} id={id} target={target} rel={rel}>
      <span>{title}</span>
      <svg className={styles.arrow}>
        <use href="sprite.svg#icon-arrow" />
      </svg>
    </Link>
  );
};

export default ButtonLink;
