import { useState } from "react";
import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";

export default function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const validate = () => {
    setError("");
    setSuccess("");
    try {
      if (!formData.first) {
        throw "Enter first name";
      }
      if (!formData.last) {
        throw "Enter last name";
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.blue} />
      <div className={styles.green} />
      <Navlinks />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Create account</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              {/* <p>First name</p> */}
              <input
                type="text"
                placeholder="First name"
                name="first"
                value={formData.first}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              {/* <p>Last name</p> */}
              <input
                type="text"
                placeholder="Last name"
                name="last"
                value={formData.last}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            {/* <p>Email</p> */}
            <input
              type="email"
              placeholder="Email"
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
          </div>
          <div className={styles.cta}>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button className={styles.signup}>Signup</button>
            <p>
              Already have an account?{" "}
              <Link href="/account/login" passHref>
                <span>Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
