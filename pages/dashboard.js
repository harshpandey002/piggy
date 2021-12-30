import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";
import WalletOverview from "@/components/WalletOverview";
import Graph from "@/components/Graph";
import BudgetOverview from "@/components/BudgetOverview";
import Recent from "@/components/Recent";
import Future from "@/components/Future";
import { parseCookies } from "nookies";

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className={styles.container}>
        <div className={styles.left}>
          <WalletOverview />
          <Graph />
          {/* <BudgetOverview /> */}
        </div>
        <div className={styles.right}>
          <Future />
          <Recent />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
