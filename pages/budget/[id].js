import { useEffect } from "react";
import BudgetDetailCard from "@/components/BudgetDetailCard";
import Layout from "@/components/Layout";
import baseUrl from "@/helpers/baseUrl";
import styles from "@/styles/BudgetDetail.module.css";
import { parseCookies } from "nookies";
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

const wait = [
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

export default function BudgetDetail({ budget }) {
  // TODO Make this component mobile friendly

  return (
    <Layout>
      <div className={styles.container}>
        <BudgetDetailCard data={budget.detail} />
        <div className={styles.content}>
          <div className={` box ${styles.left}`}>
            <TransactionHeader />
            {budget.transactions.map((data) => (
              <Transactions key={data.id} data={data} />
            ))}
          </div>
          <div className={` box ${styles.right}`}>
            <ResponsiveContainer>
              <BarChart width={500} height={300} data={wait}>
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
      {/* <div className={styles.category}>{data.category}</div> */}
      <div className={styles.date}>{data.date}</div>
      <div className={styles.desc}>{data.desc}</div>
      <div className={`${styles.money} ${data.gain ? "green" : "red"} `}>
        {data.money > 0 ? "+" + data.money : data.money}
      </div>
    </div>
  );
};

const TransactionHeader = () => {
  return (
    <div className={styles.transactionHeader}>
      <div className={styles.date}>Date</div>
      <div className={styles.desc}>Note</div>
      <div className={styles.money}>Amount</div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  const { token } = parseCookies(ctx);

  const res = await fetch(baseUrl + "budget/" + id, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return {
    props: {
      budget: data,
    },
  };
}
