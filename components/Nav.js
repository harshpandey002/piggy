import styles from "@/styles/Nav.module.css";
import {
  AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineSetting,
} from "react-icons/ai";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.container}>
      <ul className={styles.links}>
        <Link href="/dashboard" passHref>
          <li>
            <AiOutlineHome className={styles.icon} />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link href="/transaction" passHref>
          <li>
            <AiOutlineCreditCard className={styles.icon} />
            <span>Transaction</span>
          </li>
        </Link>
        <Link href="/budget" passHref>
          <li>
            <AiOutlineDollarCircle className={styles.icon} />
            <span>Budget</span>
          </li>
        </Link>
        <li>
          <AiOutlineSetting className={styles.icon} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}
