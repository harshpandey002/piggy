import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalBudget.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import Select from "react-select";
import { dropStyles2, getTheme, categoryOp } from "@/util/common";
import { DateRange } from "react-date-range";

export default function ModalBudget({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [category, setCategory] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClose = (e) => {
    e.preventDefault();
    document.body.style.overflow = "initial";
    onClose();
  };

  const modalContent = show ? (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={` box ${styles.modal}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            {/* <label className={styles.label} htmlFor="type">
            Category
          </label> */}
            <Select
              styles={dropStyles2}
              options={categoryOp}
              theme={getTheme}
              value={category}
              isClearable
              onChange={setCategory}
              isSearchable={false}
              placeholder="Choose Category"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="type">
              Select time period
            </label>
            <DateRange
              className={styles.wrapper}
              editableDateInputs={true}
              rangeColors={["#3d91ff", "#00000", "#fed14c"]}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.flex}></div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="amount">
              How much you want to spend?
            </label>
            <input id="amount" type="number" placeholder="Enter amount" />
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