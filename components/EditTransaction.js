import { useState } from "react";
import styles from "@/styles/EditTransaction.module.css";
import { parseCookies } from "nookies";
import { motion } from "framer-motion";
import { dropStyles2, getTheme, categoryOp } from "@/util/common";
import Select from "react-select";
import baseUrl from "@/helpers/baseUrl";

export default function EditTransaction({
  setEditMode,
  handleClose,
  getTransactions,
}) {
  const [gain, setGain] = useState("loose");
  const [necessary, setNecessary] = useState(true);
  const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const { token } = parseCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyObj = {
      gain: gain == "gain" ? true : false,
      category: category.value,
      necessary,
      amount: Number(amount),
      note,
    };

    const res = await fetch(baseUrl + "transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(bodyObj),
    });

    const data = await res.json();

    if (res.ok) {
      getTransactions();
      handleClose(e);
    } else {
      console.log(data.error);
    }

    // setEditMode(false);
  };

  const setValue = (fn) => (e) => {
    fn(e.target.value);
  };

  return (
    <motion.div layoutId="12" className={` box  ${styles.editContainer}`}>
      <div className={styles.toggle}>
        <label
          className={gain == "gain" && styles.green}
          onClick={(e) => setGain("gain")}
          htmlFor="gain"
        >
          Gain
        </label>
        <input
          name="gain"
          type="radio"
          value={gain}
          checked={gain == "gain" && true}
        />
        <label
          className={gain == "loose" && styles.red}
          onClick={(e) => setGain("loose")}
          htmlFor="loose"
        >
          Loose
        </label>
        <input
          name="gain"
          type="radio"
          value={gain}
          checked={gain == "loose" && true}
        />
      </div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <motion.div layoutId="e" className={styles.inputGroup}>
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
        </motion.div>

        {gain == "loose" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layoutId="a"
            className={styles.inputGroup}
          >
            <label className={styles.label} htmlFor="type">
              Transaction Type
            </label>
            <div className={styles.flex}>
              <label
                className={necessary && styles.white}
                onClick={(e) => setNecessary(true)}
                htmlFor="necessary"
              >
                Necessary
              </label>
              <input
                name="type"
                type="radio"
                value={necessary}
                checked={necessary && true}
              />
              <label
                className={!necessary && styles.red}
                onClick={(e) => setNecessary(false)}
                htmlFor="unnecessary"
              >
                Unnecessary
              </label>
              <input
                name="type"
                type="radio"
                value={necessary}
                checked={!necessary && true}
              />
            </div>
          </motion.div>
        )}

        <motion.div layoutId="b" className={styles.inputGroup}>
          <label className={styles.label} htmlFor="amount">
            How much did you loose?
          </label>
          <motion.input
            style={{ color: `${gain == "gain" ? "#59bb1c" : "#fa634e"}` }}
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={setValue(setAmount)}
          />
        </motion.div>
        <motion.div layoutId="c" className={styles.inputGroup}>
          <label className={styles.label} htmlFor="desc">
            note
          </label>
          <textarea
            id="desc"
            placeholder="Type here . . ."
            value={note}
            onChange={setValue(setNote)}
          />
        </motion.div>
        <div className={styles.cta}>
          <button onClick={handleClose}>Discard</button>
          <button className={gain == "gain" ? styles.green : styles.red}>
            Submit
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
