import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Login() {
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
          <h2>Login</h2>
          <p>
            Don{"'"}t have an account?{" "}
            <Link href="/account/signup" passHref>
              <span>Signup</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <p>Email</p>
            <input type="text" placeholder="E-mail" />
          </div>
          <div className={styles.inputGroup}>
            <p>Password</p>
            <input type="text" placeholder="Password" />
          </div>
          <div className={styles.cta}>
            <button className={styles.login}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
