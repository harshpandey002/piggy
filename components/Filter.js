import { useState } from "react";
import styles from "@/styles/Filter.module.css";
import Select from "react-select";
import ReactSlider from "react-slider";
import { dropStyles1, getTheme, categoryOp } from "@/util/common";
import { DateRange } from "react-date-range";

export default function Filter() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.input}>
        <p>By category</p>
        <Select
          styles={dropStyles1}
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
          placeholder="Enter keyword"
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
  );
}
