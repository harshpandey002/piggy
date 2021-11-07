import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Nav from "./Nav";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <Nav />
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
