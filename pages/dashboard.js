import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";
import WalletOverview from "@/components/WalletOverview";
import Graph from "@/components/Graph";
import BudgetOverview from "@/components/BudgetOverview";
import Recent from "@/components/Recent";
import Future from "@/components/Future";

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
          <Future />
          <Recent />
        </div>
      </div>
    </Layout>
  );
}
