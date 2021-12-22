import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
import ModalTransaction from "@/components/ModalTransaction";
import Filter from "@/components/Filter";
import { parseCookies } from "nookies";
import moment from "moment";
import { getDebounce } from "@/util/common";
import { BiSort } from "react-icons/bi";

const debounceTransaction = getDebounce();

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
    limit: "",
    createdAt: -1,
  });

  const handleAdd = () => {
    setEditMode("Add");
    setShowModal(true);
  };

  useEffect(() => {
    getTransactions();
  }, [filter]);

  const getTransactions = () => {
    debounceTransaction(filter, setTransactions);
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
            <TransactionHeader filter={filter} setFilter={setFilter} />
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
        {data.amount > 0 ? "+" + data.amount : data.amount}
        {/* {data.amount < 0 ? -1 * data.amount : data.amount} */}
      </div>
    </div>
  );
};

const TransactionHeader = ({ setFilter, filter }) => {
  const handleDate = () => {
    setFilter({
      ...filter,
      createdAt: -1 * filter.createdAt,
      amount: "",
    });
  };

  const handleAmount = () => {
    setFilter({
      ...filter,
      amount: filter.amount ? -1 * filter.amount : -1,
    });
  };

  return (
    <div className={styles.transactionHeader}>
      <div className={styles.category}>Category</div>
      <div onClick={handleDate} className={styles.date}>
        Date <BiSort />
      </div>
      <div className={styles.desc}>Note</div>
      <div onClick={handleAmount} className={styles.money}>
        Amount <BiSort />
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
