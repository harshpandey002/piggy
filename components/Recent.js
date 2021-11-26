import { useState, useEffect } from "react";
import styles from "@/styles/Recent.module.css";
import { numberWithCommas } from "@/util/util";
import { recent } from "@/util/content";

export default function Recent() {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.header}>
        <h3>Recent Transactions</h3>
      </div>
      <div className={styles.content}>
        {recent.map((data) => (
          <Transaction key={data} data={data} />
        ))}
      </div>
    </div>
  );
}

const Transaction = ({ data }) => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    if (data.gain) {
      setColor("green");
    }
  }, []);

  return (
    <div className={styles.row}>
      <p>{data.date}</p>
      <p>{data.category}</p>
      <p className={styles[color]}>{numberWithCommas(data.price)}</p>
    </div>
  );
};
