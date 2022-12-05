import Head from "next/head";
import styles from "../styles/index.module.css";
import { Icon } from "@iconify/react";
import AddQuestion from "../components/Professor/addQuestions";
import SubmittedQuestions from "../components/Professor/submittedQuestions";
import { useState } from "react";
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
import LoginStatus from "../components/LoginStatus";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import quizIcon from "@iconify/icons-material-symbols/quiz";
import useTopics from "../hooks/useTopics";
import Link from "next/link";

import loadData from "../utils/firebase-utils.mjs";
import data from "../../data/seed.json";
import clearDatabase from "../utils/firebase-utils.mjs";

//Documentation to understand AwesomeButton
//https://github.com/rcaferati/react-awesome-button
import { AwesomeButton } from "react-awesome-button";

function loadQuestions() {
  loadData(data);
}

export default function ProfessorMain() {
  const [submitted, setSubmitted] = useState();

  const topicsList = useTopics();

  if (submitted !== true) {
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
          <Link href="/professor">
            <span className={styles.active}>
              <Icon icon={questionFill} width="25" height="20" inline />
              Professor
            </span>
          </Link>
          <Link href="/quiz">
            <span>
              <Icon icon={quizIcon} width="25" height="20" inline />
              Quiz
            </span>
          </Link>
          <LoginStatus />
        </div>

        <main>
          <span>
            <h1 className="title">Add Questions</h1>
            <AddQuestion
              topics={topicsList}
              setSubmitted={setSubmitted}
              submitted={submitted}
            />
          </span>
          <br />
          <span>
            <AwesomeButton type="primary" onReleased={() => loadQuestions()}>
              Load Questions
            </AwesomeButton>
            <div className={styles.divider} />
            <AwesomeButton type="primary" onReleased={() => clearDatabase()}>
              Reset Questions
            </AwesomeButton>
          </span>
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
          <Link href="/">
            <span>
              <Icon icon={homeAlt1} width="25" height="25" inline />
              Home
            </span>
          </Link>
          <Link href="/professor">
            <span className={styles.active}>
              <Icon icon={questionFill} width="25" height="20" inline />
              Professor
            </span>
          </Link>
          <Link href="/quiz">
            <span>
              <Icon icon={quizIcon} width="25" height="20" inline />
              Quiz
            </span>
          </Link>
          <LoginStatus />
        </div>
        <main>
          <span>
            <h1 className="title">Add Questions</h1>
            <SubmittedQuestions
              setSubmitted={setSubmitted}
              submitted={submitted}
            />
          </span>
          <br />
          <span>
            <AwesomeButton
              type="primary"
              onReleased={() => complete(questions)}
            >
              Load Questions
            </AwesomeButton>
            <div className={styles.divider} />
            <AwesomeButton
              type="primary"
              onReleased={() => complete(questions)}
            >
              Reset Questions
            </AwesomeButton>
          </span>
        </main>

        <footer>A 312 project</footer>
      </div>
    );
  }
}
