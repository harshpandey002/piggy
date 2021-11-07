import styles from "@/styles/Nav.module.css";
import {
  AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineSetting,
} from "react-icons/ai";
export default function Nav() {
  return (
    <div className={styles.container}>
      <ul className={styles.links}>
        <li>
          <AiOutlineHome className={styles.icon} />
          <span>Dashboard</span>
        </li>
        <li>
          <AiOutlineCreditCard className={styles.icon} />
          <span>Transaction</span>
        </li>
        <li>
          <AiOutlineDollarCircle className={styles.icon} />
          <span>Budget</span>
        </li>
        <li>
          <AiOutlineSetting className={styles.icon} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}
