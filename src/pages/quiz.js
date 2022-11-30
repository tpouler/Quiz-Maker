import Head from "next/head";

import styles from "../styles/index.module.css";

//import data from "../../../data/seed.json";

import Quiz from "../components/quiz";

import ScoreReport from "../components/scoreReport";

import { useState, useEffect } from "react";

import { useUser } from "../contexts/UserContext";

import LoginStatus from "../components/LoginStatus";

import Link from "next/link";

import ChooseTopic from "../components/chooseTopic";

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

export default function QuizMain() {
  //Imports data from the Json file
  //const [questions] = useState(data);
  //const questions = useQuestions(["Math", "Science"]);
  const [submitted, setSubmitted] = useState();
  const [topicsChosen, setTopicsChosen] = useState(false);
  const [prof, setProf] = useState(false);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);

  const user = useUser();

  useEffect(() => {
    if (user && user.displayName) {
      if (user.displayName === "professor") {
        setProf(true);
      }
    }
  }, [user]); // eslint-disable-line

  useEffect(() => {
    //console.log(topics)
  }, [topics]);

  //Still need to update json to have answer field filled in with out answer
  function complete(questionList) {
    setSubmitted(true);
    return questionList;
  }

  return (
    <div className={styles.header}>
      <Head>
        <title>Potoo project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.topnav}>
        <Link href="/">
          <span>
            <Icon icon={homeAlt1} width="25" height="25" inline />
            Home
          </span>
        </Link>
        {prof && (
          <Link href="/professor">
            <span>
              <Icon icon={questionFill} width="25" height="20" inline />
              Professor
            </span>
          </Link>
        )}
        <Link href="/quiz">
          <span className={styles.active}>
            <Icon icon={quizIcon} width="25" height="20" inline /> Quiz
          </span>
        </Link>
        <LoginStatus />
      </div>

      <main>
        {!topicsChosen && !submitted && (
          <ChooseTopic
            setTopics={setTopics}
            setTopicsChosen={setTopicsChosen}
          />
        )}
        {topicsChosen && !submitted && (
          <Quiz
            topics={topics}
            complete={complete}
            submitted={submitted}
            setQuestions={setQuestions}
          />
        )}
        {topicsChosen && submitted && <ScoreReport questions={questions} />}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
