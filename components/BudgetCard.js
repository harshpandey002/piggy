import styles from "@/styles/BudgetCard.module.css";
import { numberWithCommas, handleColor } from "@/util/util";
import router from "next/router";
import moment from "moment";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { parseCookies } from "nookies";
import baseUrl from "@/helpers/baseUrl";

export default function BudgetCard({ data, fetchBudget }) {
  const { token } = parseCookies();

  const handleDelete = async (e) => {
    e.stopPropagation();

    const api = await fetch(baseUrl + "budget/" + data._id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const res = await api.json();

    if (api.ok) {
      fetchBudget();
    } else {
      alert(res.error);
    }
  };

  return (
    <div
      onClick={() => router.push(`/budget/${data._id}`)}
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
      <div onClick={handleDelete} className={styles.delete}>
        <AiOutlineDelete className={styles.icon} />
      </div>
    </div>
  );
}
