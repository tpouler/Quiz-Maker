import Head from "next/head";

import styles from "../styles/index.module.css";

import data from "../../data/seed.json";

import Quiz from "../components/quiz";

import { useState } from "react";

export default function Main() {
  //Imports data from the Json file
  const [questions] = useState(data);

  //Still need to update json to have answer field filled in with out answer
  function complete(questionList) {
    //Can delete - only for testing to make sure response elements are updating
    questionList.map((element) => console.log(element.response));
    return questionList;
  }

  return (
    <div className={styles.container}>
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
}
