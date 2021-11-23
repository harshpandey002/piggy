import styles from "@/styles/BudgetCard.module.css";
import { numberWithCommas } from "@/util/util";

export default function BudgetCard() {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.category}>
        <p>Groceries</p>
      </div>
      <div className={styles.content}>
        <h2 className="tooltip" data-tooltip={`₹${numberWithCommas(7000)}`}>
          {numberWithCommas(7000)} <span>left</span>
        </h2>
        <p className="tooltip" data-tooltip={`₹${numberWithCommas(10000)}`}>
          from {numberWithCommas(10000)}
        </p>
      </div>
      <div className={styles.visual}>
        <div className={styles.outer}>
          <div className={styles.inner} />
        </div>
        <div className={styles.dates}>
          <p>Nov 01, 2021</p>
          <p>Nov 30, 2021</p>
        </div>
      </div>
    </div>
  );
}
