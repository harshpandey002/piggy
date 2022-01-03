import { useState, useEffect } from "react";
import styles from "@/styles/Header.module.css";
import moment from "moment";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.logo}>
          <h1>Piggy</h1>
        </div>

        <div className={styles.navItems}>
          <div className={styles.time}>
            <p>{moment(time).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
