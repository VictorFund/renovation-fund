import styles from "./LangSwitcher.module.scss";


const LangSwitcher = ({ className }) => {
  return <button className={`${styles.langSwitch} ${className}`}>UA</button>;
};


export default LangSwitcher;