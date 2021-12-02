import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Transaction.module.css";
import { transactions } from "@/util/content";
import Select from "react-select";
import ReactSlider from "react-slider";
import { dropStyles, getTheme, categoryOp } from "@/util/common";
import { DateRange } from "react-date-range";
import ModalTransaction from "@/components/ModalTransaction";

export default function Transaction() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleAdd = () => {
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.create}>
            <button onClick={handleAdd}>Add Transaction</button>
          </div>
          <div className={styles.picker}>
            <button>Oct 20, 2021 - Nov 03, 2021</button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={` box ${styles.left}`}>
            {transactions.map((data) => (
              <Transactions
                key={data.id}
                data={data}
                setEditMode={setEditMode}
                setShowModal={setShowModal}
              />
            ))}
          </div>
          <div className={` box ${styles.right}`}>
            <div className={styles.input}>
              <p>By category</p>
              <Select
                styles={dropStyles}
                options={categoryOp}
                theme={getTheme}
                value={category}
                isClearable
                onChange={setCategory}
                isSearchable={false}
                placeholder="Select Category"
              />
            </div>
            <div className={styles.input}>
              <p>By note</p>
              <input
                type="search"
                value={keyword}
                placeholder="By keyword"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <p>By amount</p>
              <ReactSlider
                className={styles.sliderContainer}
                thumbClassName={styles.sliderThumb}
                onChange={(value, index) =>
                  console.log(`onChange: ${JSON.stringify({ value, index })}`)
                }
                trackClassName="sliderTrack"
                defaultValue={[0, 100]}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                pearling
                minDistance={10}
              />
            </div>
            {/* <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            /> */}
          </div>
        </div>
      </div>
      <ModalTransaction
        editMode={editMode}
        show={showModal}
        onClose={() => setShowModal(false)}
        setEditMode={setEditMode}
      />
    </Layout>
  );
}

const Transactions = ({ data, setEditMode, setShowModal }) => {
  const handleClick = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div onClick={handleClick} className={styles.transaction}>
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
