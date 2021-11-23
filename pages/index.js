import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <ul className={styles.navlinks}>
        <Link href="/dashboard" passHref>
          <li>Dashboard</li>
        </Link>
        <Link href="/budget" passHref>
          <li>Budget</li>
        </Link>
        <Link href="/transaction" passHref>
          <li>Transactions</li>
        </Link>
      </ul>
    </div>
  );
}
