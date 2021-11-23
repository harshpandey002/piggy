import styles from "@/styles/Future.module.css";
import { AiOutlineSetting } from "react-icons/ai";

export default function Future() {
  return (
    <div className={` box ${styles.container}`}>
      <div className={styles.header}>
        <span>July 12, 2025</span>
        <span>
          <AiOutlineSetting />
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.worth}>
          <div className={styles.net}>
            {/*? Net Worth after saving */}
            <h3 className="tooltip" data-tooltip="₹ 1540000">
              1540000
            </h3>
            <p>Net worth</p>
          </div>
          <div className={styles.earn}>
            <h3>1040500</h3>
            <p>Without Save</p>
          </div>
        </div>
        <div className={styles.dependencies}>
          <div className={styles.returns}>
            <h3>6%</h3>
            <p>/ month</p>
          </div>
          <div className={styles.save}>
            <h3>2000</h3>
            <p>/ month</p>
          </div>
        </div>
      </div>
    </div>
  );
}