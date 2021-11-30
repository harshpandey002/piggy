import BudgetDetailCard from "@/components/BudgetDetailCard";
import Layout from "@/components/Layout";
import styles from "@/styles/BudgetDetail.module.css";
import { transactions } from "@/util/content";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Oct 5",
    pv: 0,
  },
  {
    name: "Oct 7",
    pv: 234,
  },
  {
    name: "Oct 10",
    pv: 0,
  },
  {
    name: "Oct 14",
    pv: 800,
  },
  {
    name: "Oct 16",
    pv: 0,
  },
  {
    name: "Oct 20",
    pv: 0,
  },
  {
    name: "Oct 22",
    pv: 230,
  },
  {
    name: "Oct 25",
    pv: 0,
  },
  {
    name: "Oct 27",
    pv: 600,
  },
  {
    name: "Oct 29",
    pv: 0,
  },
  {
    name: "Oct 30",
    pv: 0,
  },
];

export default function BudgetDetail() {
  const filterTransactions = transactions.filter(
    (data) => data.category == "Food and Drinks"
  );

  return (
    <Layout>
      <div className={styles.container}>
        <BudgetDetailCard />
        <div className={styles.content}>
          <div className={` box ${styles.left}`}>
            {filterTransactions.map((data) => (
              <Transactions key={data.id} data={data} />
            ))}
          </div>
          <div className={` box ${styles.right}`}>
            <ResponsiveContainer>
              <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pv" fill="#fa634e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Transactions = ({ data }) => {
  return (
    <div className={styles.transaction}>
      <div className={styles.category}>{data.category}</div>
      <div className={styles.date}>{data.date}</div>
      <div className={styles.desc}>{data.desc}</div>
      <div
        className={`${styles.money} ${
          data.gain ? `${styles.green}` : `${styles.red}`
        } `}
      >
        {data.money}
      </div>
    </div>
  );
};
