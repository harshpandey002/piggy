import styles from "@/styles/Graph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Graph({ data }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <div className={styles.name}>
          <h3>Balance Overview</h3>
        </div>
        <div className={styles.filters}>
          <button>Day</button>
          <button>Week</button>
          <button>Month</button>
        </div>
      </div> */}

      <div className={` box ${styles.content}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip cursor={false} />
            <Line type="monotone" dataKey="balance" stroke="#000" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// <div className={styles.filter}>
//    <label htmlFor="day">Day</label>
//    <input type="radio" id="day" name="timeFrame" />
// </div>
// <div className={styles.filter}>
//  <label htmlFor="week">Week</label>
//  <input type="radio" id="week" name="timeFrame" />
// </div>
// <div className={styles.filter}>
//  <label htmlFor="month">Month</label>
//  <input type="radio" id="month" name="timeFrame" />
// </div>
