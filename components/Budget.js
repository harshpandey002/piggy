import styles from "@/styles/Budget.module.css";

export default function Budget() {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.category}>
        <p>Groceries</p>
      </div>
      <div className={styles.content}>
        <h2>
          7000 INR <span>left</span>
        </h2>
        <p>from 10000 INR</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.outer}>
          <div className={styles.inner}></div>
        </div>
        <div className={styles.dates}>
          <p>Nov 01, 2021</p>
          <p>Nov 30, 2021</p>
        </div>
      </div>
    </div>
  );
}
