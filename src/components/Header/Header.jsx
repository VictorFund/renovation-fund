"use client";

import { usePathname } from "next/navigation";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return;
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoWrapp}>
          <HeaderLogo />
        </div>
        <NavigationHeader />
        <LangSwitcher className={styles.LangSwitcher} />
        <ButtonLink id={styles.supportBtn} href="/donate" title="Підтримати" />
        <BurgerBtn />
      </div>
    </header>
  );
};

export default Header;
