import BurgerBtn from "../Buttons/BurgerBtn/BurgerBtn";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
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

        <ButtonLink id={styles.supportBtn} href="/donate" title="Підтримати" />
      </div>
    </header>
  );
};

export default Header;
