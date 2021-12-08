import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Signup() {
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
          <h2>Create account</h2>
          <p>
            Already have an account?{" "}
            <Link href="/account/login" passHref>
              <span>Login</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <p>First name</p>
              <input type="text" placeholder="First name" />
            </div>
            <div className={styles.inputGroup}>
              <p>Last name</p>
              <input type="text" placeholder="Last name" />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <p>Email</p>
            <input type="text" placeholder="E-mail" />
          </div>
          <div className={styles.inputGroup}>
            <p>Password</p>
            <input type="text" placeholder="Password" />
          </div>
          <div className={styles.cta}>
            <button className={styles.signup}>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
