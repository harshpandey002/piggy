import styles from "@/styles/BudgetDetailCard.module.css";
import { handleColor, numberWithCommas } from "@/util/util";
import { motion } from "framer-motion";
import moment from "moment";

export default function BudgetDetailCard({ data }) {
  console.log(data);

  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.category}>
        <p>{data.category}</p>
      </div>
      <div className={styles.content}>
        <h2
          style={{ color: handleColor(data.expend) }}
          className="tooltip"
          data-tooltip={`₹${numberWithCommas(data.balance)}`}
        >
          {numberWithCommas(data.balance)} <span>left</span>
        </h2>
        <p
          className="tooltip"
          data-tooltip={`₹${numberWithCommas(data.limit)}`}
        >
          from {numberWithCommas(data.limit)}
        </p>
      </div>
      <div className={styles.visual}>
        <div className={styles.outer}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${data.expend}%` }}
            style={{
              backgroundColor: handleColor(data.expend),
            }}
            className={styles.inner}
          />
        </div>
        <div className={styles.dates}>
          <p>{moment(data.startDate).format("MMM DD YYYY")}</p>
          <p>{moment(data.endDate).format("MMM DD YYYY")}</p>
        </div>
      </div>
    </div>
  );
}
