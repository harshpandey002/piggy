import BudgetCard from "@/components/BudgetCard";
import Layout from "@/components/Layout";
import styles from "@/styles/Budget.module.css";

export default function Budget() {
  return (
    <Layout>
      <div className={styles.container}>
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </div>
    </Layout>
  );
}
