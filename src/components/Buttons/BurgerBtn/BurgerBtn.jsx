"use client";

import { SiteContext } from "@/context/siteContext";
import { useContext, useEffect } from "react";
import styles from "./BurgerBtn.module.scss";

const BurgerBtn = ({ className, id }) => {
  const { burgerMenu, setBurgermenu } = useContext(SiteContext);

  useEffect(() => {
    const handleBodyClass = () => {
      const mainEl = document.querySelector("main");

      if (burgerMenu === true) {
        mainEl?.classList.add("bluredBody");
        document.body.style.overflowY = "hidden";
      } else {
        mainEl?.classList.remove("bluredBody");
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "hidden";
      }
    };

    handleBodyClass();

    return () => {
      // Видалення обробника подій при видаленні компонента
      const mainEl = document.querySelector("main");
      mainEl?.classList.remove("bluredBody");
    };
  }, [burgerMenu]);

  return (
    <button
      className={`headerBtnsSmall`}
      id={styles.btn}
      onClick={() => {
        setBurgermenu(!burgerMenu);
      }}
    >
      {burgerMenu ? (
        <svg className={`${styles.icon} ${styles.close}`}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      ) : (
        <svg className={styles.icon}>
          <use href="/sprite.svg#icon-burger"></use>
        </svg>
      )}
    </button>
  );
};

export default BurgerBtn;
