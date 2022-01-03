/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/WalletOverview.module.css";
import { numberWithCommas } from "@/util/util";

export default function WalletOverview({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Balance</p>
            <h3
              className="green tooltip"
              style={{ marginTop: 0 }}
              data-tooltip={`₹${numberWithCommas(data.currentBalance)}`}
            >
              {numberWithCommas(data.currentBalance)}
            </h3>
            {/* <p
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.balancePerDay)}`}
            >
              {numberWithCommas(data.balancePerDay)} <span>/ day</span>
            </p> */}
            {/* <p style={{ visibility: "hidden" }}>hide</p> */}
          </div>
          {/* <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/IcFqY2izVyv1.png?o=1"
                alt=""
              />
            </div>
            <p>10%</p>
          </div> */}
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Income</p>
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.currentIncome)}`}
            >
              {numberWithCommas(data.currentIncome)}
            </h3>
            <p
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.incomePerDay)}`}
            >
              {numberWithCommas(data.incomePerDay)} <span>/ day</span>
            </p>
          </div>
          {/* <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/M4kd49AErbyR.png?o=1"
                alt=""
              />
            </div>
            <p style={{ color: "#fa634e" }}>6%</p>
          </div> */}
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Expense</p>
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.currentExpense)}`}
            >
              {numberWithCommas(data.currentExpense)}
            </h3>
            <p
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.expensePerDay)}`}
            >
              {numberWithCommas(data.expensePerDay)} <span>/ day</span>
            </p>
          </div>
          {/* <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/IcFqY2izVyv1.png?o=1"
                alt=""
              />
            </div>
            <p>3%</p>
          </div> */}
        </div>
        <div className={` box ${styles.card}`}>
          <div className={styles.left}>
            <p>Waste</p>
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.currentWaste)}`}
            >
              {numberWithCommas(data.currentWaste)}
            </h3>
            <p
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.wastePerDay)}`}
            >
              {numberWithCommas(data.wastePerDay)} <span>/ day</span>
            </p>
          </div>
          {/* <div className={styles.right}>
            <div className={styles.img}>
              <img
                src="https://gcdn.pbrd.co/images/M4kd49AErbyR.png?o=1"
                alt=""
              />
            </div>
            <p style={{ color: "#fa634e" }}>6%</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
