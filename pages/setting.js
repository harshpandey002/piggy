import Layout from "@/components/Layout";
import { parseCookies } from "nookies";
import styles from "@/styles/Setting.module.css";
import BalanceSetting from "@/components/BalanceSetting";
import FutureSetting from "@/components/FutureSetting";

export default function Setting() {
  //! TODO cannot parseCookies() and get user info

  return (
    <Layout>
      <div className={styles.container}>
        <BalanceSetting />
        <FutureSetting />
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
