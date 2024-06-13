"use client";

import Link from "next/link";
import React, { useState } from "react";
import { navLinks } from "../../data/navLinks";
import styles from "./NavigationHeader.module.scss";

const NavigationHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleNav = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };
  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <ul className={styles.headerNav}>
      {navLinks.map((el) => {
        return (
          <li key={el.title} className={styles.navItem}>
            <p
              className={styles.navItemTitle}
              onClick={() => toggleNav(el.title)}
            >
              {el.title}
              <svg
                className={`${styles.arrow} ${
                  activeMenu === el.title ? styles.arrActive : ""
                }`}
              >
                <use href="sprite.svg#icon-vector"></use>
              </svg>
            </p>
            <nav
              className={`${styles.linksWrapp} ${
                activeMenu === el.title ? styles.active : ""
              }`}
            >
              {el.subMenu.map((item) => {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={styles.navLink}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationHeader;
