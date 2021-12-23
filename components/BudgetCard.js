import styles from "@/styles/BudgetCard.module.css";
import { numberWithCommas } from "@/util/util";
import router from "next/router";
import moment from "moment";

export default function BudgetCard({ data }) {
  // TODO add hover styles to container
  return (
    <div
      onClick={() => router.push("/budget/1234")}
      className={` box ${styles.container}`}
    >
      <div className={styles.category}>
        <p>{data.category}</p>
      </div>
      <div className={styles.content}>
        <h2 className="tooltip" data-tooltip={`₹${numberWithCommas(7000)}`}>
          {numberWithCommas(7000)} <span>left</span>
        </h2>
        <p className="tooltip" data-tooltip={`₹${numberWithCommas(10000)}`}>
          from {numberWithCommas(data.limit)}
        </p>
      </div>
      <div className={styles.visual}>
        <div className={styles.outer}>
          <div className={styles.inner} />
        </div>
        <div className={styles.dates}>
          <p>{moment(data.startDate).format("MMM DD YYYY")}</p>
          <p>{moment(data.endDate).format("MMM DD YYYY")}</p>
        </div>
      </div>
    </div>
  );
}
