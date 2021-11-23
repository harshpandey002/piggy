import styles from "@/styles/BudgetOverview.module.css";
import BudgetCard from "./BudgetCard";

export default function BudgetOverview() {
  return (
    <div className={styles.container}>
      <BudgetCard />
      <BudgetCard />
      <BudgetCard />
    </div>
  );
}
