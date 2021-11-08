import styles from "@/styles/Dashboard.module.css";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.top}></div>
          <div className={styles.bottom}></div>
        </div>
      </div>
    </Layout>
  );
}
