import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import TranslatorBtnBlock from "@/components/LangSwitcher/TranslatorBtnBlock";

import NavigationHeader from "../NavigationHeader/NavigationHeader";
import styles from "./Header.module.scss";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoWrapp}>
          <HeaderLogo />
        </div>
        <NavigationHeader />
        <TranslatorBtnBlock className={styles.LangSwitcher} />
        <ButtonLink id={styles.supportBtn} href="/donate" title="Підтримати" />
        <BurgerBtn />
      </div>
    </header>
  );
};

export default Header;
