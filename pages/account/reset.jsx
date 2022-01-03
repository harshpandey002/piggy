import { useState } from "react";
import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Reset() {
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const [c_pass, setC_pass] = useState("");

  const validate = () => {
    setError("");
    try {
      if (!pass) {
        throw "Enter password";
      }
      if (!c_pass) {
        throw "Confirm password";
      }
      if (pass !== c_pass) {
        throw "Passwords do not match";
      }
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.blue} />
      <div className={styles.green} />
      <Navlinks />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="New password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm password"
              value={c_pass}
              onChange={(e) => setC_pass(e.target.value)}
            />
          </div>
          <div className={styles.cta}>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.login}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
