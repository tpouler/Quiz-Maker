import Head from "next/head";

import styles from "../styles/index.module.css";

import LoginStatus from "../components/LoginStatus";

// All icons were taken from the following link
// https://icon-sets.iconify.design/

// eslint-disable-next-line quotes
import { Icon } from "@iconify/react";
// eslint-disable-next-line quotes
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import quizIcon from "@iconify/icons-material-symbols/quiz";

//Testing

export default function Main() {
  //console.log(`boolean of answer submitted is: ${submitted}`);
  return (
    <div className={styles.header}>
      <Head>
        <title>Potoo project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.topnav}>
        <a className={styles.active} href="home">
          <Icon icon={homeAlt1} width="25" height="25" inline /> Home
        </a>
        <a href="professor">
          <Icon icon={questionFill} width="25" height="20" inline /> Professor
        </a>
        <a href="quiz">
          {" "}
          <Icon icon={quizIcon} width="25" height="20" inline /> Quiz
        </a>
        <LoginStatus />
      </div>

      <h1>Welcome to our quiz page!</h1>
      <p>
        This is a page where you can practice your skills and continue to
        progress over time.
      </p>
      <br />
      <p>Please click one of the options from the nav bar above.</p>
      <br />
      <div>Professor</div>
      <div>This is where you can add questions to your quiz</div>
      <br />
      <div>Quiz</div>
      <div>This is where you can practice your skills</div>
      <br />

      <footer>A 312 project</footer>
    </div>
  );
}
