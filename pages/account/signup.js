import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.blue} />
      <div className={styles.green} />
      <Navlinks />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Create account</h2>
          <p>
            Already have and account?{" "}
            <Link href="/account/login" passHref>
              <span>Login</span>
            </Link>
          </p>
        </div>
        <form className={styles.form}>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="First name" />
            </div>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Last name" />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="E-mail" />
          </div>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Password" />
          </div>
          <div className={styles.cta}>
            <button>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
