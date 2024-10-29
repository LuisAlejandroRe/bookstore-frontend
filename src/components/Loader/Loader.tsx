import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
}

export default Loader;
