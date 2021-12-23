import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/ModalBudget.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import Select from "react-select";
import { dropStyles2, getTheme, expenseOp } from "@/util/common";
import { DateRange } from "react-date-range";
import baseUrl from "@/helpers/baseUrl";
import { parseCookies } from "nookies";

export default function ModalBudget({ show, onClose, fetchBudget }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [category, setCategory] = useState([]);
  const [limit, setLimit] = useState();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = parseCookies();

    const bodyObj = {
      category: category.value,
      startDate: range[0].startDate,
      endDate: range[0].endDate,
      limit: Number(limit),
    };

    const res = await fetch(baseUrl + "budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(bodyObj),
    });

    const data = await res.json();

    if (res.ok) {
      fetchBudget();
      handleClose(e);
    } else {
      alert(data.error);
    }
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
              options={expenseOp}
              theme={getTheme}
              isClearable
              value={category}
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
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.flex}></div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="amount">
              How much you want to spend?
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
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
