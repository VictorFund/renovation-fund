import React from "react";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <NavigationHeader />
      </div>
    </header>
  );
};

export default Header;
