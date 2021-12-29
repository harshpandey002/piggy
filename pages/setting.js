import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { parseCookies } from "nookies";
import styles from "@/styles/Setting.module.css";
import BalanceSetting from "@/components/BalanceSetting";
import FutureSetting from "@/components/FutureSetting";
import baseUrl from "@/helpers/baseUrl";

export default function Setting() {
  //! TODO cannot parseCookies() and get user info
  const [settings, setSettings] = useState({});
  const { token } = parseCookies();
  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const res = await fetch(baseUrl + "setting", {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setSettings(data);
    } else {
      alert(data.error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <BalanceSetting settings={settings} getSettings={getSettings} />
        <FutureSetting settings={settings} getSettings={getSettings} />
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
