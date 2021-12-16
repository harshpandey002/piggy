import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalTransaction.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import EditTransaction from "./EditTransaction";
import moment from "moment";

export default function ModalTransaction({
  show,
  onClose,
  editMode,
  setEditMode,
  setTransaction,
  transaction,
  getTransactions,
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    document.body.style.overflow = "initial";
    onClose();
  };

  const modalContent = show ? (
    <AnimateSharedLayout>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={` ${styles.modal}`}>
        {editMode ? (
          <EditTransaction
            handleClose={handleClose}
            setEditMode={setEditMode}
            transaction={transaction}
            setTransaction={setTransaction}
            getTransactions={getTransactions}
          />
        ) : (
          <PreviewTransaction
            transaction={transaction}
            handleClose={handleClose}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </AnimateSharedLayout>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

const PreviewTransaction = ({ setEditMode, handleClose, transaction }) => {
  return (
    <motion.div layoutId="12" className={` box ${styles.previewContainer}`}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>{moment(transaction.createdAt).format("MMM DD YYYY")}</h3>
          <motion.p layoutId="e">{transaction.category}</motion.p>
        </div>
        <motion.div layoutId="b" className={styles.right}>
          <h3>{transaction.amount}</h3>
        </motion.div>
      </div>
      <motion.div layoutId="c" className={styles.description}>
        <p>{transaction.note}</p>
      </motion.div>
      <div className={styles.btn}>
        <button onClick={handleClose}>Close</button>
        <button onClick={() => setEditMode(true)}>Edit Transaction</button>
      </div>
    </motion.div>
  );
};
