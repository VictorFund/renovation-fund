import React from "react";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import Logo from "../Logo/Logo";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Logo />
        <NavigationHeader />
        <LangSwitcher className={styles.LangSwitcher} />
        <BurgerBtn />
      </div>
    </header>
  );
};

export default Header;
