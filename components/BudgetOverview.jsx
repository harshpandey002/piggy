import { useState, useEffect } from "react";
import styles from "@/styles/BudgetOverview.module.css";
import BudgetCard from "./BudgetCard";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

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
      setBudgets(data);
    } else {
      console.log(data.error);
    }
  };

  if (budgets.length) {
    return (
      <div className={styles.container}>
        {budgets.map((budget) => (
          <BudgetCard
            key={budget._id}
            data={budget}
            fetchBudget={fetchBudget}
          />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
