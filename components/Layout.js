// import Head from "next/head";
// import styles from "@/styles/Layout.module.css";
// import Header from "./Header";
// import { useContext } from "react";
// import ThemeContext from "@/context/ThemeContext";

// const Layout = ({ title, keywords, description, children }) => {
//   const { background } = useContext(ThemeContext);

//   return (
//     <div
//       style={{
//         backgroundColor: background,
//         transition: "background-color 0.5s",
//       }}
//     >
//       <Head>
//         <title>{title}</title>
//         <meta name="description" content={description} />
//         <meta name="keywords" content={keywords} />
//       </Head>

//       <Header />

//       <div className={styles.container}>{children}</div>
//     </div>
//   );
// };

// Layout.defaultProps = {
//   title: "Sevic | Freelance Agency ",
//   description:
//     "Leading digital agency focused on UI/UX design. We develop complex websites and elaborate online business services.",
//   keywords: "UI/UX, Websites, Branding",
// };

// export default Layout;
