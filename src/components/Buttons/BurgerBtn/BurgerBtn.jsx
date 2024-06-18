"use client";

import { SiteContext } from "@/context/siteContext";
import React, { useContext } from "react";
import styles from "./BurgerBtn.module.scss";

const BurgerBtn = () => {
  const { burgerMenu, setBurgermenu } = useContext(SiteContext);

  return (
    <button
      className={styles.btn}
      onClick={() => {
        setBurgermenu(!burgerMenu);
        console.log("burgerMenu", burgerMenu);
      }}
    >
      <svg className={styles.icon}>
        <use href="/sprite.svg#icon-burger"></use>
      </svg>
    </button>
  );
};

export default BurgerBtn;
