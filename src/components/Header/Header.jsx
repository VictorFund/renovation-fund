import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/">
          <Image src="/images/Logo.webp" width={282} height={60} alt="logo" />
        </Link>
        <NavigationHeader />
      </div>
    </header>
  );
};

export default Header;
