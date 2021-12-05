import { useState } from "react";
import BudgetCard from "@/components/BudgetCard";
import Layout from "@/components/Layout";
import styles from "@/styles/Budget.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import ModalBudget from "@/components/ModalBudget";

export default function Budget() {
  return (
    <Layout>
      <div className={styles.container}>
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <NewBudget />
      </div>
    </Layout>
  );
}

const NewBudget = () => {
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
      <ModalBudget show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
