import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
import ModalTransaction from "@/components/ModalTransaction";
import Filter from "@/components/Filter";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";
import moment from "moment";
import { filterTransaction } from "@/util/common";

export default function Transaction() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState();
  const [transaction, setTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    note: "",
    min: "",
    max: "",
    sort: 1,
    limit: "",
  });

  const handleAdd = () => {
    setEditMode("Add");
    setShowModal(true);
  };

  useEffect(() => {
    getTransactions();
  }, [filter]);

  const getTransactions = async () => {
    const data = await filterTransaction(filter);
    setTransactions(data);
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
          <Filter filter={filter} setFilter={setFilter} />
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
    setTransaction(data);
    setEditMode();
    setShowModal(true);
  };

  return (
    <div onClick={handleClick} className={styles.transaction}>
      <div className={styles.category}>{data.category}</div>
      <div className={styles.date}>
        {moment(data.createdAt).format("MMM DD YYYY")}
      </div>
      <div className={styles.desc}>{data.note}</div>
      <div className={`${styles.money} ${data.gain ? "green" : "red"} `}>
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
