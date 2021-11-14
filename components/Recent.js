import { useState, useEffect } from "react";
import styles from "@/styles/Recent.module.css";

const transactions = [
  {
    date: "Nov 30",
    category: "Food",
    price: 600,
    gain: false,
  },
  {
    date: "Nov 28",
    category: "Transport",
    price: 200,
    gain: false,
  },
  {
    date: "Nov 25",
    category: "Extra Income",
    price: 500,
    gain: true,
  },
  {
    date: "Nov 20",
    category: "Groceries",
    price: 1500,
    gain: false,
  },
  {
    date: "Nov 18",
    category: "Food",
    price: 800,
    gain: false,
  },
  {
    date: "Nov 18",
    category: "Transport",
    price: 300,
    gain: false,
  },
  {
    date: "Nov 15",
    category: "Food",
    price: 500,
    gain: false,
  },
  {
    date: "Nov 10",
    category: "Transport",
    price: 200,
    gain: false,
  },
  {
    date: "Nov 8",
    category: "Gym Essentials",
    price: 1500,
    gain: false,
  },
  {
    date: "Nov 3",
    category: "Salary",
    price: 40000,
    gain: true,
  },
];

export default function Recent() {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.header}>
        <h3>Recent Transactions</h3>
      </div>
      <div className={styles.content}>
        {transactions.map((data) => (
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
      <p className={styles[color]}>{data.price}</p>
    </div>
  );
};
