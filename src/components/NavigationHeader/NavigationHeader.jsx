"use client";
import { SiteContext } from "@/context/siteContext";
import { currentLanguages } from "@/data";
import { useWindowResize } from "@/hooks/useWindowResize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { navLinks } from "../../data/navLinks";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import TranslatorBtnBlock from "../LangSwitcher/TranslatorBtnBlock";
import styles from "./NavigationHeader.module.scss";

const NavigationHeader = () => {
  const { isDesktop } = useWindowResize();

  const [activeMenu, setActiveMenu] = useState(null);
  const { burgerMenu, setBurgermenu } = useContext(SiteContext);
  const [subPath, setSubPath] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const pathname = usePathname();
  const { i18n } = useTranslation();

  const isLangEn = !isLoad && i18n.language === currentLanguages.EN;

  const onWindowClick = () => {
    setActiveMenu(null);
  };
  useEffect(() => {
    setIsLoad(false);
    if (isDesktop) {
      setBurgermenu(false);
    }
    if (activeMenu !== null) {
      setTimeout(() => {
        window.addEventListener("click", onWindowClick);
      }, 100);
    }

    for (const el of navLinks) {
      if (el.subMenu) {
        for (const item of el.subMenu) {
          if (pathname.startsWith(item.href)) {
            setSubPath(true);
            break;
          }
        }
      } else if (pathname.startsWith(el.href)) {
        setSubPath(false);
        break;
      }
    }

    return () => window.removeEventListener("click", onWindowClick);
  }, [isDesktop, activeMenu, setBurgermenu, pathname]);

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
        <TranslatorBtnBlock id={styles.langSwitcher} />
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
                className={
                  subPath
                    ? `${styles.navItemTitle} ${styles.activeTitle}`
                    : `${styles.navItemTitle}`
                }
                onClick={() => toggleNav(el.title)}
              >
                {isLangEn ? el.titleEn : el.title}

                <svg
                  className={`${styles.arrow} ${
                    activeMenu === el.title ? styles.arrActive : ""
                  }`}
                >
                  <use href="/sprite.svg#icon-vector"></use>
                </svg>
              </p>
              <div
                className={
                  activeMenu === el.title
                    ? `${styles.subMenuWrapp} ${styles.subMenuWrappActive}`
                    : `${styles.subMenuWrapp}`
                }
              >
                <nav
                  className={
                    activeMenu === el.title
                      ? `${styles.linksWrapp} ${styles.linksWrappActive}`
                      : `${styles.linksWrapp}`
                  }
                >
                  {el.subMenu?.map((item) => {
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={
                          pathname.startsWith(item.href)
                            ? `${styles.navLink} ${styles.activeTitle}`
                            : `${styles.navLink}`
                        }
                        onClick={closeMenu}
                        target={item.target ? item.target : "_self"}
                      >
                        {isLangEn ? item.titleEn : item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </li>
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
                className={
                  pathname.startsWith(el.href)
                    ? `${styles.navItemTitle} ${styles.activeTitle}`
                    : `${styles.navItemTitle}`
                }
              >
                {isLangEn ? el.titleEn : el.title}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavigationHeader;
