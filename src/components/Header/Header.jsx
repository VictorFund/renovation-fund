import React from "react";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import Logo from "../Logo/Logo";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Logo />
        <NavigationHeader />
        <BurgerBtn />
      </div>
    </header>
  );
};

export default Header;
