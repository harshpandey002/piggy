import styles from "@/styles/BudgetCard.module.css";
import { numberWithCommas, handleColor } from "@/util/util";
import router from "next/router";
import moment from "moment";

export default function BudgetCard({ data }) {
  // TODO add hover styles to container
  console.log(data);

  return (
    <div
      onClick={() => router.push("/budget/1234")}
      className={` box ${styles.container}`}
    >
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
          <div
            style={{
              width: `${data.expend}%`,
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
