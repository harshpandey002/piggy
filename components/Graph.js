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

import { numberWithCommas } from "@/util/util";

const data = [
  {
    name: "Nov 3",
    pv: 10000,
  },
  {
    name: "Nov 8",
    pv: 16500,
  },
  {
    name: "Nov 10",
    pv: 17000,
  },
  {
    name: "Nov 15",
    pv: 19080,
  },
  {
    name: "Nov 18",
    pv: 17080,
  },
  {
    name: "Nov 18",
    pv: 21000,
  },
  {
    name: "Nov 18",
    pv: 17000,
  },
  {
    name: "Nov 20",
    pv: 27000,
  },
  {
    name: "Nov 25",
    pv: 25000,
  },
  {
    name: "Nov 30",
    pv: 31000,
  },
  {
    name: "Nov 28",
    pv: 30000,
  },
];

export default function Graph() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>
          <h3>Balance Overview</h3>
        </div>
        <div className={styles.filters}>
          <button>Day</button>
          <button>Week</button>
          <button>Month</button>
        </div>
      </div>

      <div className={` box ${styles.content}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false} />
            <Line type="monotone" dataKey="pv" stroke="#000" dot={false} />
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
