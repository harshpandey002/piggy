import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
import { transactions } from "@/util/content";
import Select from "react-select";
import ReactSlider from "react-slider";
import { dropStyles, getTheme, categoryOp } from "@/util/common";

export default function Transaction() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.create}>
            <button>Add Transaction</button>
          </div>
          <div className={styles.picker}>
            <button>Oct 20, 2021 - NOv 03, 2021</button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={` box ${styles.left}`}>
            {transactions.map((data) => (
              <Transactions key={data.id} data={data} />
            ))}
          </div>
          <div className={` box ${styles.right}`}>
            <div className={styles.input}>
              <Select
                styles={dropStyles}
                options={categoryOp}
                theme={getTheme}
                value={category}
                onChange={setCategory}
                isSearchable={false}
                placeholder="Select Category"
              />
            </div>
            <div className={styles.input}>
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[0, 100]}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
                pearling
                minDistance={10}
              />
            </div>
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
