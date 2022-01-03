import styles from "@/styles/Future.module.css";
import { AiOutlineSetting } from "react-icons/ai";
import { numberWithCommas } from "@/util/util";
import moment from "moment";

export default function Future({ data }) {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.header}>
        <span>{moment(data.futureDate).format("MMMM DD, YYYY")}</span>
        <span>
          <AiOutlineSetting />
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.worth}>
          <div className={styles.net}>
            {/*? Net Worth after saving */}
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(data.futureBalance)}`}
            >
              {numberWithCommas(data.futureBalance)}
            </h3>
            <p>Net worth</p>
          </div>
          {/* <div className={styles.earn}>
            <h3
              className="tooltip"
              data-tooltip={`₹${numberWithCommas(1040500)}`}
            >
              {numberWithCommas(1040500)}
            </h3>
            <p>Without Save</p>
          </div> */}
        </div>
        <div className={styles.dependencies}>
          <div className={styles.returns}>
            <h3>{data.returns}%</h3>
            <p>Returns</p>
          </div>
          {/* <div className={styles.save}>
            <h3 className="tooltip" data-tooltip={`₹${numberWithCommas(2000)}`}>
              {numberWithCommas(2000)}
            </h3>
            <p>Saved</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
