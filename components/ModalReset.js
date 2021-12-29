import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalReset.module.css";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

export default function ModalReset({ show, onClose, isReset, getSettings }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    document.body.style.overflow = "initial";
    onClose();
  };

  const modalContent = show ? (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={` box ${styles.modal}`}>
        {isReset ? (
          <ResetAccount handleClose={handleClose} getSettings={getSettings} />
        ) : (
          <MakeTransaction
            handleClose={handleClose}
            getSettings={getSettings}
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

const ResetAccount = ({ handleClose, getSettings }) => {
  const [amount, setAmount] = useState();

  const handleSubmit = async (e) => {
    const { token } = parseCookies();

    const res = await fetch(baseUrl + "setting", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ initialBalance: amount }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data.error);
    }
  };

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

        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className={styles.action}>
        <button onClick={handleClose} className={styles.btnWhite}>
          Discard
        </button>
        <button onClick={handleSubmit} className={styles.btnRed}>
          Reset
        </button>
      </div>
    </div>
  );
};

const MakeTransaction = ({ handleClose, getSettings }) => {
  const [amount, setAmount] = useState();

  const handleSubmit = async () => {
    const { token } = parseCookies();

    const res = await fetch(baseUrl + "setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ initialBalance: amount }),
    });

    const data = await res.json();

    if (res.ok) {
      handleClose();
      getSettings();
    } else {
      console.log(data.error);
    }
  };

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
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className={styles.action}>
        <button onClick={handleClose} className={styles.btnWhite}>
          Discard
        </button>
        <button onClick={handleSubmit} className={styles.btnDark}>
          Submit
        </button>
      </div>
    </div>
  );
};
