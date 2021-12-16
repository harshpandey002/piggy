import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
// import { transactions } from "@/util/content";

import ModalTransaction from "@/components/ModalTransaction";
import Filter from "@/components/Filter";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";
import moment from "moment";

export default function Transaction() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);

  const handleAdd = () => {
    setEditMode(true);
    setShowModal(true);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const { token } = parseCookies();

    const res = await fetch(baseUrl + "transaction", {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();

    if (res.ok) {
      setTransactions(data.transactions);
    } else {
      console.log(data.error);
    }
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
              <TransactionInfo
                key={data.id}
                data={data}
                setEditMode={setEditMode}
                setShowModal={setShowModal}
                setTransaction={setTransaction}
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
        transaction={transaction}
        setTransaction={setTransaction}
        getTransactions={getTransactions}
      />
    </Layout>
  );
}

const TransactionInfo = ({
  data,
  setEditMode,
  setShowModal,
  setTransaction,
}) => {
  const handleClick = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div onClick={handleClick} className={styles.transaction}>
      <div className={styles.category}>{data.category}</div>
      <div className={styles.date}>
        {moment(data.createdAt).format("MMM Do YYYY")}
      </div>
      <div className={styles.desc}>{data.note}</div>
      <div
        className={`${styles.money} ${
          data.gain ? `${styles.green}` : `${styles.red}`
        } `}
      >
        {data.amount}
      </div>
    </div>
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
