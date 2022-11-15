import Head from "next/head";
import styles from "../../styles/index.module.css";
import { Icon } from "@iconify/react";
import data from "../../../data/seed.json";
import AddQuestion from "../../components/Professor/addQuestions";
import SubmittedQuestions from "../../components/Professor/submittedQuestions";
import { useState } from "react";
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
import LoginStatus from "../../components/LoginStatus";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";

export default function Main() {
  const [questions] = useState(data);
  const [submitted, setSubmitted] = useState();

  const topicsList = [];

  questions.forEach((element) => {
    if (!topicsList.includes(element.topic)) {
      topicsList.push(element.topic);
    }
  });
  if (submitted !== true) {
    return (
      <div className={styles.header}>
        <Head>
          <title>Potoo project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.topnav}>
          <a href="http://localhost:3000/">
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </a>
          <a className={styles.active} href="Professor">
            <Icon icon={questionFill} width="25" height="20" inline /> Professor
          </a>
          <a href="Quiz">Quiz</a>

          <LoginStatus />
        </div>

        <main>
          <h1 className="title">Add Questions</h1>
          <AddQuestion
            topics={topicsList}
            setSubmitted={setSubmitted}
            submitted={submitted}
          />
        </main>

        <footer>A 312 project</footer>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        <Head>
          <title>Potoo project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.topnav}>
          <a className={styles.active} href="javascript:history.back()">
            {" "}
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </a>
          <LoginStatus />
        </div>
        <main>
          <h1 className="title">Add Questions</h1>
          <SubmittedQuestions
            setSubmitted={setSubmitted}
            submitted={submitted}
          />
        </main>
        <footer>A 312 project</footer>
      </div>
    );
  }
}
