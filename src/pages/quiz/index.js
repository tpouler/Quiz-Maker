import Head from "next/head";

import styles from "../../styles/index.module.css";

import data from "../../../data/seed.json";

import Quiz from "../../components/quiz";

import ScoreReport from "../../components/scoreReport";

import { useState } from "react";

import LoginStatus from "../../components/LoginStatus";

// All icons were taken from the following link
// https://icon-sets.iconify.design/

// eslint-disable-next-line quotes
import { Icon } from "@iconify/react";
// eslint-disable-next-line quotes
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes

//Testing

export default function Main() {
  //Imports data from the Json file
  const [questions] = useState(data);
  const [submitted, setSubmitted] = useState();
  //const [errorMessage, setErrorMessage] = useState();

  //Still need to update json to have answer field filled in with out answer
  function complete(questionList) {
    setSubmitted(true);
    return questionList;
  }

  //console.log(`boolean of answer submitted is: ${submitted}`);
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
        <a href="professor">
          <Icon icon={questionFill} width="25" height="20" inline /> Professor
        </a>
        <a href="quiz" className={styles.active}>
          Quiz
        </a>
        <LoginStatus />
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
