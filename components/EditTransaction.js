import { useState, useEffect } from "react";
import styles from "@/styles/EditTransaction.module.css";
import { parseCookies } from "nookies";
import { motion } from "framer-motion";
import { dropStyles2, getTheme, expenseOp, incomeOp } from "@/util/common";
import Select from "react-select";
import baseUrl from "@/helpers/baseUrl";

export default function EditTransaction({
  editMode,
  //TODO Cleanup
  setEditMode,
  handleClose,
  transaction,
  getTransactions,
}) {
  const [gain, setGain] = useState("loose");
  const [necessary, setNecessary] = useState(true);
  const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const { token } = parseCookies();

  useEffect(() => {
    const populate = () => {
      setGain(transaction.gain ? "gain" : "loose");
      setNecessary(transaction.necessary);
      setAmount(transaction.amount);
      setNote(transaction.note);
      setCategory({ label: transaction.category, value: transaction.category });
    };

    if (editMode == "Edit") populate();
  }, []);

  const handleDecide = (e) => {
    e.preventDefault();

    if (editMode == "Add") {
      createTransaction(e);
      return;
    }

    if (editMode == "Edit") {
      updateTrasaction(e);
    }
  };

  const getBodyObj = () => {
    let number = Number(amount);
    number = gain == "gain" ? number : -1 * number;
    const bodyObj = {
      gain: gain == "gain" ? true : false,
      category: category.value,
      necessary,
      amount: number,
      note,
    };

    return bodyObj;
  };

  //TODO Create validation function

  const updateTrasaction = async (e) => {
    const bodyObj = getBodyObj();
    bodyObj._id = transaction._id;

    const res = await fetch(baseUrl + "transaction", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(bodyObj),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data.message);
      getTransactions();
      handleClose(e);
    } else {
      console.log(data.error);
    }
  };

  const createTransaction = async (e) => {
    const bodyObj = getBodyObj();

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
        onSubmit={handleDecide}
        className={styles.form}
      >
        <motion.div layoutId="e" className={styles.inputGroup}>
          {/* <label className={styles.label} htmlFor="type">
            Category
          </label> */}
          <Select
            styles={dropStyles2}
            options={gain == "gain" ? incomeOp : expenseOp}
            theme={getTheme}
            //TODO Clear value when "gain" is changed
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
