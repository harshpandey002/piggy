import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Dashboard</h1>
      </div>
    </Layout>
  );
}
