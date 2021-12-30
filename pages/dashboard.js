import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";
import WalletOverview from "@/components/WalletOverview";
import Graph from "@/components/Graph";
import BudgetOverview from "@/components/BudgetOverview";
import Recent from "@/components/Recent";
import Future from "@/components/Future";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

export default function Dashboard({ overview }) {
  return (
    <Layout title="Dashboard">
      <div className={styles.container}>
        <div className={styles.left}>
          <WalletOverview data={overview.walletOverview} />
          <Graph data={overview.balanceOverview} />
          {/* <BudgetOverview /> */}
        </div>
        <div className={styles.right}>
          <Future data={overview.futureData} />
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

  const res = await fetch(baseUrl + "dashboard", {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return {
    props: { overview: data },
  };
}
