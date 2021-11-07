import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.logo}>
          <h1>Piggy</h1>
        </div>

        <div className={styles.navItems}>
          <div className={styles.time}>
            <p>01 Nov | 12:44AM</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
