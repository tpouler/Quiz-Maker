import Head from "next/head";

import styles from "../styles/index.module.css";

import data from "../../data/seed.json";

import Quiz from "../components/quiz";

import ScoreReport from "../components/scoreReport";

import { useState } from "react";

// eslint-disable-next-line quotes
import { Icon } from "@iconify/react";
// eslint-disable-next-line quotes
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import loginOutlined from "@iconify/icons-ant-design/login-outlined";

export default function Main() {
  //Imports data from the Json file
  const [questions] = useState(data);
  const [submitted, setSubmitted] = useState();

  //Still need to update json to have answer field filled in with out answer
  function complete(questionList) {
    //Can delete - only for testing to make sure response elements are updating
    questionList.map((element) => console.log(element.response));
    console.log(questions[0].response);
    setSubmitted(true);
    return questionList;
  }

  console.log(`boolean of answer submitted is: ${submitted}`);
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
        <a href="hints">
          <Icon icon={questionFill} width="25" height="20" inline /> Hints
        </a>
        <a href="login">
          <Icon icon={loginOutlined} width="25" height="20" /> Login
        </a>
      </div>

      <main>
        <h1 className="title">Quiz 1</h1>
        <Quiz questions={questions} complete={complete} submitted={submitted} />
        {submitted && <ScoreReport questions={questions} />}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
