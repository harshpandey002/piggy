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
import moment from "moment";

export default function BudgetDetail({ budget }) {
  // TODO Make this component mobile friendly

  return (
    <Layout title="Budget Detail">
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
              <BarChart width={500} height={300} data={budget.chart}>
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#fa634e" />
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
      <div className={styles.date}>
        {moment(data.createdAt).format("MMM DD YYYY")}
      </div>
      <div className={styles.desc}>{data.note ? data.note : "--"}</div>
      <div className={`${styles.money} ${data.gain ? "green" : "red"} `}>
        {data.amount > 0 ? "+" + data.amount : data.amount}
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
