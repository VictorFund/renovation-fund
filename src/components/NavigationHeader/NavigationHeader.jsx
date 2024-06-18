"use client";
"use client";

import { SiteContext } from "@/context/siteContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { navLinks } from "../../data/navLinks";
import styles from "./NavigationHeader.module.scss";

const NavigationHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { burgerMenu, setBurgermenu } = useContext(SiteContext);

  const toggleNav = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };
  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <ul
      className={
        burgerMenu
          ? `${styles.headerNav} ${styles.headerNavBurger}`
          : `${styles.headerNav}`
      }
    >
      {navLinks.map((el) => {
        return (
          <li
            key={el.title}
            className={
              activeMenu === el.title
                ? `${styles.navItem} ${styles.navItemActive}`
                : `${styles.navItem}`
            }
          >
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
                    target={item.target ? item.target : null}
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
