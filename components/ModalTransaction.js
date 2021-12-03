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
  const [gain, setGain] = useState("loose");
  const [necessary, setNecessary] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };
  return (
    <motion.div layoutId="12" className={` box  ${styles.editContainer}`}>
      <div className={styles.toggle}>
        <label
          className={gain == "gain" && styles.green}
          onClick={(e) => setGain("gain")}
          htmlFor="gain"
        >
          Gain
        </label>
        <input
          name="gain"
          type="radio"
          value={gain}
          checked={gain == "gain" && true}
        />
        <label
          className={gain == "loose" && styles.red}
          onClick={(e) => setGain("loose")}
          htmlFor="loose"
        >
          Loose
        </label>
        <input
          name="gain"
          type="radio"
          value={gain}
          checked={gain == "loose" && true}
        />
      </div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {gain == "loose" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layoutId="a"
            className={styles.inputGroup}
          >
            <label className={styles.label} htmlFor="type">
              Transaction Type
            </label>
            <div className={styles.flex}>
              <label
                className={necessary && styles.white}
                onClick={(e) => setNecessary(true)}
                htmlFor="necessary"
              >
                Necessary
              </label>
              <input
                name="type"
                type="radio"
                value={necessary}
                checked={necessary && true}
              />
              <label
                className={!necessary && styles.red}
                onClick={(e) => setNecessary(false)}
                htmlFor="unnecessary"
              >
                Unnecessary
              </label>
              <input
                name="type"
                type="radio"
                value={necessary}
                checked={!necessary && true}
              />
            </div>
          </motion.div>
        )}

        <motion.div layoutId="b" className={styles.inputGroup}>
          <label className={styles.label} htmlFor="amount">
            How much did you loose?
          </label>
          <input
            style={{ color: `${gain == "gain" ? "#59bb1c" : "#fa634e"}` }}
            id="amount"
            type="number"
            placeholder="Enter amount"
          />
        </motion.div>
        <motion.div layoutId="c" className={styles.inputGroup}>
          <label className={styles.label} htmlFor="desc">
            Description
          </label>
          <textarea id="desc" placeholder="Type here . . ." />
        </motion.div>
        <div className={styles.cta}>
          <button onClick={handleClose}>Discard</button>
          <button className={gain == "gain" ? styles.green : styles.red}>
            Submit
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

const PreviewTransaction = ({ setEditMode, handleClose }) => {
  return (
    <motion.div layoutId="12" className={` box ${styles.previewContainer}`}>
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
