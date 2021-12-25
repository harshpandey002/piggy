import { useState, useEffect } from "react";
import styles from "@/styles/BudgetOverview.module.css";
import BudgetCard from "./BudgetCard";
import { parseCookies } from "nookies";

export default function BudgetOverview() {
  const { token } = parseCookies();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    const res = await fetch(baseUrl + "budget", {
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data.budgets);
      setBudgets(data.budgets);
    } else {
      console.log(data.error);
    }
  };

  return (
    <div className={styles.container}>
      {budgets.map((budget) => (
        <BudgetCard key={budget._id} data={budget} />
      ))}
    </div>
  );
}
