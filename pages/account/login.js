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
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* <p>Email</p> */}
            <input type="email" placeholder="E-mail" />
          </div>
          <div className={styles.inputGroup}>
            {/* <p>Password</p> */}
            <input type="password" placeholder="Password" />
            <Link href="/account/forgot" passHref>
              <p>Forgot Password?</p>
            </Link>
          </div>
          <div className={styles.cta}>
            <button className={styles.login}>Login</button>
            <p>
              Don{"'"}t have an account?{" "}
              <Link href="/account/signup" passHref>
                <span>Signup</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
