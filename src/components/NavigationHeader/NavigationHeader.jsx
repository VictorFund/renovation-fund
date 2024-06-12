import Link from "next/link";
import React from "react";
import { navLinks } from "../../data/navLinks";
import styles from "./NavigationHeader.module.scss";

const NavigationHeader = () => {
  return (
    <nav className={styles.headerNav}>
      {navLinks.map((el) => {
        return (
          <Link href={el.href} key={el.title}>
            {el.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationHeader;
