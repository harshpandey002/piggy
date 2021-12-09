import { useState } from "react";
import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Forgot() {
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.blue} />
      <div className={styles.green} />
      <Navlinks />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Recover account</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* <p>Email</p> */}
            <input type="email" placeholder="E-mail" />
          </div>

          <div className={styles.cta}>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.login}>Send Link</button>
            {/* <p>
              <Link href="/account/login" passHref>
                <span>Login</span>
              </Link>{" "}
              instead
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}
