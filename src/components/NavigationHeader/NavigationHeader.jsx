"use client";

import { SiteContext } from "@/context/siteContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { navLinks } from "../../data/navLinks";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import styles from "./NavigationHeader.module.scss";

const NavigationHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { burgerMenu, setBurgermenu } = useContext(SiteContext);

  const toggleNav = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const closeMenu = (e) => {
    setActiveMenu(null);
    setBurgermenu(false);
  };

  return (
    <ul
      className={
        burgerMenu
          ? `${styles.headerNav} ${styles.headerNavBurger}`
          : `${styles.headerNav}`
      }
    >
      <li className={styles.mobMenuHeader}>
        <LangSwitcher className={styles.langSwitcher} />
        <BurgerBtn className={styles.burgerBtn} />
      </li>
      {navLinks.map((el) => {
        if (el.subMenu) {
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
                  className={`${styles.arrow} ${activeMenu === el.title ? styles.arrActive : ""
                    }`}
                >
                  <use href="sprite.svg#icon-vector"></use>
                </svg>
              </p>
              <nav
                className={`${styles.linksWrapp} ${activeMenu === el.title ? styles.active : ""
                  }`}
              >
                {el.subMenu?.map((item) => {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={styles.navLink}
                      onClick={closeMenu}
                      target={item.target ? item.target : "_self"}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </li>
          );
        } else {
          return (
            <li
              key={el.title}
              className={
                activeMenu === el.title
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : `${styles.navItem}`
              }
              onClick={() => toggleNav(el.title)}
            >
              <Link
                href={el.href}
                target={el.target ? el.target : null}
                className={styles.navItemTitle}
              >
                {el.title}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavigationHeader;
