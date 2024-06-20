import React from 'react';
import styles from './Button.module.scss';

const Button = ({ costumBtn }) => {
  return (
    <button className={styles.btn + ' ' + costumBtn}>
      <span>Задонатити</span>
      <svg className={styles.arrowHero}>
        <use href="sprite.svg#icon-arrow" />
      </svg>
    </button>
  );
};

export default Button;
