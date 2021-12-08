import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Reset() {
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
          <h2>Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="New password" />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Confirm password" />
          </div>

          <div className={styles.cta}>
            <button className={styles.login}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
