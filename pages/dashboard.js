import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";
import WalletOverview from "@/components/WalletOverview";
import Graph from "@/components/Graph";
import BudgetOverview from "@/components/BudgetOverview";
import Recent from "@/components/Recent";

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <WalletOverview />
          <Graph />
          <BudgetOverview />
        </div>
        <div className={styles.right}>
          <div className={`box ${styles.top}`}></div>
          <Recent />
        </div>
      </div>
    </Layout>
  );
}
