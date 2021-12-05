import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalBudget.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";

export default function ModalBudget({ show, onClose }) {
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
      <div className={` box ${styles.modal}`}>
        <h3>Modal Budgets</h3>
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
