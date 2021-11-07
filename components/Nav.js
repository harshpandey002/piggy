import styles from "@/styles/Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <ul style={{ listStyle: "none" }}>
        <li>Dashboard</li>
        <li>Transaction</li>
        <li>Budget</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}
