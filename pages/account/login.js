import { useState } from "react";
import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";
import baseUrl from "@/helpers/baseUrl";

export default function Login() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    setError("");
    try {
      if (!formData.email) {
        throw "Enter your email";
      }
      if (!formData.password) {
        throw "Enter password";
      }
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
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
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            {/* <p>Password</p> */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Link href="/account/forgot" passHref>
              <p>Forgot Password?</p>
            </Link>
          </div>
          <div className={styles.cta}>
            {error && <p className={styles.error}>{error}</p>}
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
