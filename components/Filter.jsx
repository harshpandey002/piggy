import { useState, useEffect } from "react";
import styles from "@/styles/Filter.module.css";
import Select from "react-select";
import ReactSlider from "react-slider";
import {
  dropStyles1,
  getTheme,
  groupedOp,
  formatGroupLabel,
  getRange,
} from "@/util/common";
import { DateRange } from "react-date-range";
import baseUrl from "@/helpers/baseUrl";

export default function Filter({ setFilter, filter }) {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState();
  const [range, setRange] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchRange();
  }, []);

  const fetchRange = async () => {
    const data = await getRange();
    setRange(data);
  };

  useEffect(() => {
    setFilter({
      ...filter,
      category: category?.value,
      note,
    });
  }, [category, note]);

  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.input}>
        <p>By category</p>
        <Select
          styles={dropStyles1}
          options={groupedOp}
          formatGroupLabel={formatGroupLabel}
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
          value={note}
          placeholder="Enter keyword"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      {!!range.length && (
        <div className={styles.input}>
          <p>By amount</p>
          <ReactSlider
            className={styles.sliderContainer}
            thumbClassName={styles.sliderThumb}
            onChange={(value) => {
              setFilter({ ...filter, min: value[0], max: value[1] });
            }}
            trackClassName="sliderTrack"
            min={range[0]}
            max={range[1]}
            defaultValue={[range[0], range[1]]}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={10}
          />
        </div>
      )}

      {/* <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            /> */}
    </div>
  );
}
