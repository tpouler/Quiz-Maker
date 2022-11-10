import Head from "next/head";
import styles from "../../styles/index.module.css";
import { Icon } from "@iconify/react";
import data from "../../../data/seed.json";
import AddQuestion from "../../components/Professor/addQuestions";
import SubmittedQuestions from "../../components/Professor/submittedQuestions";
import { useState } from "react";
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
import loginOutlined from "@iconify/icons-ant-design/login-outlined";

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
          <a className={styles.active} href="javascript:history.back()">
            {" "}
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </a>

          <a href="login">
            <Icon icon={loginOutlined} width="25" height="20" /> Login
          </a>
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
          <a className={styles.active} href="home">
            {" "}
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </a>
          <a href="login">
            <Icon icon={loginOutlined} width="25" height="20" /> Login
          </a>
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
