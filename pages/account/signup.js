import { useState } from "react";
import Navlinks from "@/components/Navlinks";
import styles from "@/styles/Account.module.css";
import Link from "next/link";
import baseUrl from "@/helpers/baseUrl";

export default function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validate = () => {
    setError("");
    setSuccess("");
    try {
      if (!formData.firstName) {
        throw "Enter first name";
      }
      if (!formData.lastName) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await fetch(baseUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data);
      setSuccess(data.message);
    } else {
      setError(data.error);
    }
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              {/* <p>Last name</p> */}
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
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
