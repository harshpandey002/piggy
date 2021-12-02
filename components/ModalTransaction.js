import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalTransaction.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";

export default function ModalTransaction({
  show,
  onClose,
  editMode,
  setEditMode,
  setTransaction,
  transaction,
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

const EditTransaction = ({ setEditMode, handleClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };
  return (
    <motion.div layoutId="23" className={` box  ${styles.editContainer}`}>
      <div className={styles.toggle}>
        <label htmlFor="gain">Gain</label>
        <input name="gain" type="radio" />
        <label htmlFor="loose">Loose</label>
        <input name="gain" type="radio" />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="type">Transaction Type</label>
          <div className={styles.flex}>
            <label htmlFor="necessary">Necessary</label>
            <input name="type" type="radio" />
            <label htmlFor="unnecessary">Unnecessary</label>
            <input name="type" type="radio" />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="amount">How much did you loose?</label>
          <input id="amount" type="text" placeholder="Enter amount" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="desc">Description</label>
          <textarea id="desc" placeholder="Type here . . ." />
        </div>
        <div className={styles.cta}>
          <button onClick={handleClose}>Discard</button>
          <button>Submit</button>
        </div>
      </form>
    </motion.div>
  );
};

const PreviewTransaction = ({ setEditMode, handleClose }) => {
  return (
    <motion.div layoutId="23" className={` box ${styles.previewContainer}`}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>Oct 27, 2021</h3>
          <p>Food and Drinks</p>
        </div>
        <div className={styles.right}>
          <h3>4500</h3>
        </div>
      </div>
      <div className={styles.description}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
          reprehenderit in, labore debitis aspernatur expedita incidunt quia aut
          explicabo natus!
        </p>
      </div>
      <div className={styles.btn}>
        <button onClick={handleClose}>Close</button>
        <button onClick={() => setEditMode(true)}>Edit Transaction</button>
      </div>
    </motion.div>
  );
};
