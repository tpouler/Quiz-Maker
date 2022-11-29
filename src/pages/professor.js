import Head from "next/head";
import styles from "../styles/index.module.css";
import { Icon } from "@iconify/react";
import AddQuestion from "../../components/Professor/addQuestions";
import SubmittedQuestions from "../../components/Professor/submittedQuestions";
import { useState } from "react";
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
import LoginStatus from "../components/LoginStatus";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import quizIcon from "@iconify/icons-material-symbols/quiz";
import useTopics from "../../hooks/useTopics";
import Link from "next/link";

export default function Main() {
  // const [questions] = useState(data);
  const [submitted, setSubmitted] = useState();

  // const topicsList = [];

  // questions.forEach((element) => {
  //   if (!topicsList.includes(element.topic)) {
  //     topicsList.push(element.topic);
  //   }
  // });

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
          <a href="home">
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </a>
          <a href="professor" className={styles.active}>
            <Icon icon={questionFill} width="25" height="20" inline /> Professor
          </a>
          <a href="quiz">
            <Icon icon={quizIcon} width="25" height="20" inline /> Quiz
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