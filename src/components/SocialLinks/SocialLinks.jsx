import { socialLinks } from '@/data/socialLinks.data';
import React from 'react';
import styles from './SocialLinks.module.scss';

const SocialLinks = ({ id, costumStyles, costumSvg }) => {
  return (
    <ul className={`${styles.socialList} ${costumStyles}`} id={id}>
      {socialLinks.map(({ id, src, href, title }) => (
        <li key={id}>
          <a href={href} target="_blank" aria-label={title}>
            <svg className={`${styles.svgSocialLink} ${costumSvg}`}>
              <use href={`sprite.svg#${src}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
