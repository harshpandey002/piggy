import { useState } from "react";
import styles from "@/styles/Setting.module.css";
import ModalFuture from "@/components/ModalFuture";

export default function FutureSetting() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (bool) => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Future Projection</h3>
        <p>12 July 2026</p>
      </div>
      <div className={styles.description}>
        <p>
          You can set a date and return % per year to get a projection of you
          account balance at that perticular date.
        </p>
        <p>
          By default, date is set for 5 years from the date of creation of this
          account with 0% returns per year.
        </p>
      </div>
      <div className={styles.action}>
        <button onClick={handleClick} className={styles.btnDark}>
          12 July 2026, 0%
        </button>
      </div>
      <ModalFuture show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
