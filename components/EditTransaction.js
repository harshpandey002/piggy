import { useState } from "react";
import styles from "@/styles/EditTransaction.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";

export default function EditTransaction({ setEditMode, handleClose }) {
  const [gain, setGain] = useState("loose");
  const [necessary, setNecessary] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
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
          <input
            style={{ color: `${gain == "gain" ? "#59bb1c" : "#fa634e"}` }}
            id="amount"
            type="number"
            placeholder="Enter amount"
          />
        </motion.div>
        <motion.div layoutId="c" className={styles.inputGroup}>
          <label className={styles.label} htmlFor="desc">
            Description
          </label>
          <textarea id="desc" placeholder="Type here . . ." />
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
