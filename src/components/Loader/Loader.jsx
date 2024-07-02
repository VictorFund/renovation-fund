import styles from "./Loader.module.scss";

const Loader = ({ id }) => {
  return (
    <div className={`container ${styles.container}`} id={id}>
      <p className={styles.text}>Loading ...</p>
    </div>
  );
};

export default Loader;
