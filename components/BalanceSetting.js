import styles from "@/styles/Setting.module.css";

export default function BalanceSetting() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Initial Account Balance</h3>
        <p>10,00,000 INR</p>
      </div>
      <div className={styles.description}>
        <p>
          If you reset your initial account balance, all your transactions and
          budgets will be lost.
        </p>
        <p>
          Instead of re-setting your initial account balance, you can increase
          or decrease amount from current account balance by making a
          transaction.
        </p>
      </div>
      <div className={styles.action}>
        <button className={styles.btnDark}>Make a transaction</button>
        <button className={styles.btnRed}>Reset Account</button>
      </div>
    </div>
  );
}
