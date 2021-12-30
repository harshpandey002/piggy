import { useEffect, useState } from "react";
import BudgetCard from "@/components/BudgetCard";
import Layout from "@/components/Layout";
import styles from "@/styles/Budget.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import ModalBudget from "@/components/ModalBudget";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

export default function Budget() {
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

  return (
    <Layout title="Budget">
      <div className={styles.container}>
        {budgets.map((budget) => (
          <BudgetCard
            key={budget._id}
            data={budget}
            fetchBudget={fetchBudget}
          />
        ))}
        <NewBudget fetchBudget={fetchBudget} />
      </div>
    </Layout>
  );
}

const NewBudget = ({ fetchBudget }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={` box ${styles.content}`}
      >
        <AiOutlinePlus className={styles.plus} />
        <p>Create new budget</p>
      </div>
      <ModalBudget
        show={showModal}
        onClose={() => setShowModal(false)}
        fetchBudget={fetchBudget}
      />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
