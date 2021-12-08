import styles from "@/styles/Navlinks.module.css";
import Link from "next/link";

export default function Navlinks() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <h1>Piggy</h1>
        </Link>
      </div>
      <ul className={styles.links}>
        <Link href="/account/login" passHref>
          <li className={styles.login}>Login</li>
        </Link>
        <Link href="/account/signup" passHref>
          <li className={styles.signup}>Signup</li>
        </Link>
      </ul>
    </div>
  );
}
