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

  if (!submitted) {
    console.log(`boolean of answer Submitted is: ${submitted}`);
    return (
      <div className={styles.header}>
        <Head>
          <title>Generic project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Generic Project</h1>
          <Quiz questions={questions} complete={complete} />
        </main>

        <footer>A 312 project</footer>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Generic project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <ScoreReport questions={questions} />
        </main>
        <footer>A 312 project</footer>
      </div>
    );
  }
}
