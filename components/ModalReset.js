import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalReset.module.css";

export default function ModalReset({ show, onClose, isReset }) {
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
      <div className={styles.overlay} onClick={handleClose} />
      <div className={` box ${styles.modal}`}>
        {isReset ? (
          <ResetAccount handleClose={handleClose} />
        ) : (
          <MakeTransaction handleClose={handleClose} />
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

const ResetAccount = ({ handleClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Reset Account</h2>
      </div>
      <div className={styles.description}>
        <p>
          All your transactions and budgets will be lost and your account
          balance will reset to the amount you enter below.
        </p>
      </div>
      <div className={styles.input}>
        <label htmlFor="amount">Initial Account Balance</label>

        <input type="number" id="amount" placeholder="Enter amount" />
      </div>
      <div className={styles.action}>
        <button onClick={handleClose} className={styles.btnWhite}>
          Discard
        </button>
        <button className={styles.btnRed}>Reset</button>
      </div>
    </div>
  );
};

const MakeTransaction = ({ handleClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Make Transaction</h2>
      </div>
      <div className={styles.description}>
        <p>
          This will set your current account balance to the amount you submit
          below.
        </p>
      </div>
      <div className={styles.input}>
        <label htmlFor="amount">Current Account Balance</label>
        <input type="number" id="amount" placeholder="Enter amount" />
      </div>
      <div className={styles.action}>
        <button onClick={handleClose} className={styles.btnWhite}>
          Discard
        </button>
        <button className={styles.btnDark}>Submit</button>
      </div>
    </div>
  );
};
