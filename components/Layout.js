import Head from "next/head";
import styles from "@/styles/Layout.module.css";
// import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <div className={styles.container}>
        {/* <Header /> */}
        <div className={styles.header}>
          <h2>Header</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.navlinks}>
            <ul style={{ listStyle: "none" }}>
              <li>Dashboard</li>
              <li>Transaction</li>
              <li>Budget</li>
              <li>Settings</li>
            </ul>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Piggy | Manage your finance like a pro",
  description:
    "Interactive and visually appealing way to manage real life budgets.",
  keywords: "Money management, Future Projection, Budget Planning",
};

export default Layout;
