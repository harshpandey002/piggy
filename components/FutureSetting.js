import { useState } from "react";
import styles from "@/styles/Setting.module.css";
import ModalFuture from "@/components/ModalFuture";
import moment from "moment";

export default function FutureSetting({ settings, getSettings }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Future Projection</h3>
        <p>{moment(settings.futureDate).format("MMM Do YYYY")}</p>
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
          {moment(settings.futureDate).format("MMM Do YYYY")},{" "}
          {settings.returns}%
        </button>
      </div>
      <ModalFuture
        settings={settings}
        getSettings={getSettings}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
