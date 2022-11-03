import Head from "next/head";

import styles from "../styles/index.module.css";

import data from "../../data/seed.json";

import Quiz from "../components/quiz";

import ScoreReport from "../components/scoreReport";

import { useState } from "react";

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

  console.log(`boolean of answer Submitted is: ${submitted}`);
  return (
    <div className={styles.header}>
      <Head>
        <title>Potoo project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.flexbox}>
        <a href="home">Home</a>
        <ul className={styles.bar}>
          <li className={styles.barElement}>
            <a href="">Hints</a>
          </li>
          <li className={styles.barElement}>
            <a href="">Login</a>
          </li>
        </ul>
      </nav>

      <main>
        <h1 className="title">Quiz 1</h1>
        <Quiz questions={questions} complete={complete} submitted={submitted} />
        {submitted && <ScoreReport questions={questions} />}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
