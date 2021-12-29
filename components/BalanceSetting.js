import { useState } from "react";
import styles from "@/styles/Setting.module.css";
import ModalReset from "@/components/ModalReset";

export default function BalanceSetting({ settings, getSettings }) {
  const [isReset, setIsReset] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (bool) => {
    document.body.style.overflow = "hidden";
    setIsReset(bool);
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Initial Account Balance</h3>
        <p>{settings.initialBalance} INR</p>
      </div>
      <div className={styles.description}>
        <p>
          If you reset your initial account balance, all your transactions and
          budgets will be lost.
        </p>
        <p>
          Instead of re-setting your initial account balance, you can increase
          or decrease amount from current account balance by making a
          transaction.
        </p>
      </div>
      <div className={styles.action}>
        <button onClick={() => handleClick(false)} className={styles.btnDark}>
          Make a transaction
        </button>
        <button onClick={() => handleClick(true)} className={styles.btnRed}>
          Reset Account
        </button>
      </div>
      <ModalReset
        show={showModal}
        onClose={() => setShowModal(false)}
        isReset={isReset}
        settings={settings}
        getSettings={getSettings}
      />
    </div>
  );
}
