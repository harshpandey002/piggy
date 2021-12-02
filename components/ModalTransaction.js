import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalTransaction.module.css";

export default function ModalTransaction({
  show,
  onClose,
  editMode,
  setEditMode,
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
    <>
      <div className={styles.overlay} />
      <div className={` box ${styles.modal}`}>
        {editMode ? (
          <EditTransaction
            handleClose={handleClose}
            setEditMode={setEditMode}
          />
        ) : (
          <PreviewTransaction
            handleClose={handleClose}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </>
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
    <div className={styles.editContainer}>
      <div className={styles.toggle}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="amount"></label>
          <input id="amount" type="text" />
        </div>
        <div className={styles.cta}>
          <button onClick={handleClose}>Discard</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

const PreviewTransaction = ({ setEditMode, handleClose }) => {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h4>Oct 27, 2021</h4>
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
    </div>
  );
};
