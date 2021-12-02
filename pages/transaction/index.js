import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
import { transactions } from "@/util/content";

import ModalTransaction from "@/components/ModalTransaction";
import Filter from "@/components/Filter";

export default function Transaction() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleAdd = () => {
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.create}>
            <button onClick={handleAdd}>Add Transaction</button>
          </div>
          <div className={styles.picker}>
            <button>Oct 20, 2021 - Nov 03, 2021</button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={` box ${styles.left}`}>
            {transactions.map((data) => (
              <Transactions
                key={data.id}
                data={data}
                setEditMode={setEditMode}
                setShowModal={setShowModal}
              />
            ))}
          </div>
          <Filter />
        </div>
      </div>
      <ModalTransaction
        editMode={editMode}
        show={showModal}
        onClose={() => setShowModal(false)}
        setEditMode={setEditMode}
      />
    </Layout>
  );
}

const Transactions = ({ data, setEditMode, setShowModal }) => {
  const handleClick = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div onClick={handleClick} className={styles.transaction}>
      <div className={styles.category}>{data.category}</div>
      <div className={styles.date}>{data.date}</div>
      <div className={styles.desc}>{data.desc}</div>
      <div
        className={`${styles.money} ${
          data.gain ? `${styles.green}` : `${styles.red}`
        } `}
      >
        {data.money}
      </div>
    </div>
  );
};
