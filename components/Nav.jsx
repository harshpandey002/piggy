import styles from "@/styles/Nav.module.css";
import {
  AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import Link from "next/link";
import jsCookie from "js-cookie";
import router from "next/router";

export default function Nav() {
  const handleLogout = () => {
    jsCookie.remove("user");
    jsCookie.remove("token");
    router.push("/");
  };

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
        <Link href="/setting" passHref>
          <li>
            <AiOutlineSetting className={styles.icon} />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
      <ul className={styles.logout}>
        <li onClick={handleLogout}>
          <AiOutlineLogout className={styles.icon} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}
