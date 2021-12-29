import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalFuture.module.css";
import Select from "react-select";
import { fiveYears } from "@/util/util";
import { Calendar } from "react-date-range";
import baseUrl from "@/helpers/baseUrl";
import { parseCookies } from "nookies";

export default function ModalFuture({ show, onClose, getSettings }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [returns, setReturns] = useState(0);
  const [date, setDate] = useState(fiveYears());

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  console.log();

  const handleClose = (e) => {
    e.preventDefault();
    document.body.style.overflow = "initial";
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = parseCookies();

    const bodyObj = {
      initialBalance: "",
      futureDate: date,
      returns,
    };

    const res = await fetch(baseUrl + "setting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(bodyObj),
    });

    const data = await res.json();

    if (res.ok) {
      handleClose(e);
      getSettings();
    } else {
      alert(data.error);
    }
  };

  const modalContent = show ? (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={` box ${styles.modal}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="type">
              Select day in future
            </label>
            <Calendar
              className={styles.wrapper}
              onChange={(item) => setDate(item)}
              date={date}
              color="#00000"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.flex}></div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="returns">
              Return % per year
            </label>
            <input
              id="returns"
              type="number"
              placeholder="Enter returns"
              value={returns}
              onChange={(e) => setReturns(e.target.value)}
            />
          </div>
          <div className={styles.cta}>
            <button className={styles.discard} onClick={handleClose}>
              Discard
            </button>
            <button className={styles.submit}>Submit</button>
          </div>
        </form>
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
