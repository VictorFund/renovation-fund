"use client";
import { SiteContext } from "@/context/siteContext";
import { useWindowResize } from "@/hooks/useWindowResize";
import Link from "next/link";
import { useContext, useState } from "react";
import { navLinks } from "../../data/navLinks";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import styles from "./NavigationHeader.module.scss";


const NavigationHeader = () => {
  const { isLaptop, isDesktop } = useWindowResize();

  const [activeMenu, setActiveMenu] = useState(null);

  const { burgerMenu, setBurgermenu } = useContext(SiteContext);

  if (isDesktop) {
    setBurgermenu(false);
  }

  const toggleNav = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const closeMenu = (e) => {
    setActiveMenu(null);
    setBurgermenu(false);
  };
  const ulClassName = () => {
    if (burgerMenu && activeMenu === null) {
      return `${styles.headerNav} ${styles.headerNavBurger}`;
    } else if (burgerMenu && activeMenu !== null) {
      return `${styles.headerNav} ${styles.headerNavBurger} ${styles.headerNavBurgerActiveMenu}`;
    } else {
      return `${styles.headerNav}`;
    }
  };

  return (
    <ul className={ulClassName()}>
      <li className={styles.mobMenuHeader}>
        <LangSwitcher className={styles.langSwitcher} />
        <BurgerBtn className={styles.burgerBtn} />
        <HorizontalLine className={styles.line} />
      </li>
      {navLinks.map((el) => {
        if (el.subMenu) {
          return (
            <li
              key={el.title}
              className={`${styles.navItem}  ${styles.navItemSubmenu}`}
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
              <div
                className={
                  activeMenu === el.title
                    ? `${styles.subMenuWrapp} ${styles.subMenuWrappActive}`
                    : `${styles.subMenuWrapp}`
                }
              >
                <nav className={styles.linksWrapp}>
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
              </div>
            </li >
          );
        } else {
          return (
            <li
              key={el.title}
              className={`${styles.navItem}`}
              onClick={closeMenu}
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
    </ul >
  );
};


export default NavigationHeader;