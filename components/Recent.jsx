import { useState, useEffect } from "react";
import { numberWithCommas } from "@/util/util";
import { recent } from "@/util/content";
import styles from "@/styles/Recent.module.css";
import { getDebounce } from "@/util/common";
import moment from "moment";

const debounceTransaction = getDebounce();

export default function Recent() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    debounceTransaction({ createdAt: -1, limit: 12 }, setTransactions);
  }, []);

  let i = 0;
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.header}>
        <h3>Recent Transactions</h3>
      </div>
      <div className={styles.content}>
        {transactions.map((data) => (
          <Transaction key={i++} data={data} />
        ))}
      </div>
    </div>
  );
}

const Transaction = ({ data }) => {
  return (
    <div className={styles.row}>
      <p>{moment(data.createdAt).format("Do MMM")}</p>
      <p>{data.category}</p>
      <p className={data.gain ? "green" : "red"}>
        {numberWithCommas(data.amount)}
      </p>
    </div>
  );
};
