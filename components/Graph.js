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

const data = [
  {
    name: "Page A",
    pv: 2400,
  },
  {
    name: "Page B",
    pv: 1398,
  },
  {
    name: "Page C",
    pv: 9800,
  },
  {
    name: "Page D",
    pv: 3908,
  },
  {
    name: "Page D",
    pv: 3908,
  },
  {
    name: "Page E",
    pv: 4800,
  },
  {
    name: "Page F",
    pv: 3800,
  },
  {
    name: "Page G",
    pv: 4300,
  },
];

export default function Graph() {
  return (
    <div className={styles.container}>
      <div className={` box ${styles.content}`}>
        <ResponsiveContainer>
          <LineChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
