import styles from "@/styles/BudgetOverview.module.css";
import Budget from "./Budget";

export default function BudgetOverview() {
  return (
    <div className={styles.container}>
      <Budget />
      <Budget />
      <Budget />
    </div>
  );
}
