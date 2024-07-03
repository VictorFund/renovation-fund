"use client";

import { scrollToTop } from "@/utils/scrollToTop";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ToTopBtn.module.scss";

const ToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={
        isVisible
          ? `headerBtnsSmall ${styles.toTopBtn}`
          : `headerBtnsSmall ${styles.toTopBtn} ${styles.toTopBtnHidden}`
      }
      title="Кнопка до верху сторінки"
      aria-label="Кнопка до гори"
    >
      <svg className={styles.icon}>
        <use href="/sprite.svg#icon-arrow"></use>
      </svg>
    </button>
  );
};

export default ToTopBtn;
