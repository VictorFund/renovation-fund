"use client";

import { usePathname } from "next/navigation";
import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import TranslatorBtnBlock from "@/components/LangSwitcher/TranslatorBtnBlock";

import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { SiteContext } from "@/context/siteContext";

const Header = () => {
  const { t } = useTranslation();

  const { isLoad } = useContext(SiteContext);

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
        <TranslatorBtnBlock className={styles.LangSwitcher} />

        <ButtonLink
          id={styles.supportBtn}
          href="/donate"
          title={!isLoad && t("Buttons.Donate")}
        />

        <BurgerBtn />
      </div>
    </header>
  );
};

export default Header;
