import styles from "@/styles/Navlinks.module.css";

export default function Navlinks() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>Piggy</h1>
      </div>
      <div className={styles.links}>
        <button className={styles.login}>Login</button>
        <button className={styles.signup}>Signup</button>
      </div>
    </div>
  );
}
