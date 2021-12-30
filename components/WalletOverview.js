/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/WalletOverview.module.css";
import { numberWithCommas } from "@/util/util";

export default function WalletOverview() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Balance</p>
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(12505)}`}
            >
              {numberWithCommas(12505)}
            </h3>
            <p className="tooltip" data-tooltip={`₹${numberWithCommas(500)}`}>
              {numberWithCommas(500)} <span>/ day</span>
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/IcFqY2izVyv1.png?o=1"
                alt=""
              />
            </div>
            <p>10%</p>
          </div>
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Income</p>
            <h3 className="tooltip" data-tooltip={`₹${numberWithCommas(8430)}`}>
              {numberWithCommas(8430)}
            </h3>
            <p className="tooltip" data-tooltip={`₹${numberWithCommas(300)}`}>
              {numberWithCommas(300)} <span>/ day</span>
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/M4kd49AErbyR.png?o=1"
                alt=""
              />
            </div>
            <p style={{ color: "#fa634e" }}>6%</p>
          </div>
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Expense</p>
            <h3 className="tooltip" data-tooltip={`₹${numberWithCommas(2505)}`}>
              {numberWithCommas(2505)}
            </h3>
            <p className="tooltip" data-tooltip={`₹${numberWithCommas(500)}`}>
              {numberWithCommas(500)} <span>/ day</span>
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/IcFqY2izVyv1.png?o=1"
                alt=""
              />
            </div>
            <p>3%</p>
          </div>
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Waste</p>
            <h3 className="tooltip" data-tooltip={`₹${numberWithCommas(8430)}`}>
              {numberWithCommas(8430)}
            </h3>
            <p className="tooltip" data-tooltip={`₹${numberWithCommas(300)}`}>
              {numberWithCommas(300)} <span>/ day</span>
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/M4kd49AErbyR.png?o=1"
                alt=""
              />
            </div>
            <p style={{ color: "#fa634e" }}>6%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
