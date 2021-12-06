import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navlinks from "@/components/Navlinks";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.blue} />
      <div className={styles.green} />
      <Navlinks />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1>The one and only E-Piggy</h1>
          <p>
            Get addicted to managing money with this interactive and visually
            appealing piggy dashboard
          </p>
          <button>Get Started</button>
        </div>
        <div className={styles.right}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/heroImage.png" alt="" />
        </div>
      </div>
    </div>
  );
}
