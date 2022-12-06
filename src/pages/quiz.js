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
import SelectCourse from "../components/selectCourse";

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
  const [prof, setProf] = useState();
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currCourse, setCurrCourse] = useState();
  const [courseChosen, setCourseChosen] = useState(false);
  const [id, setID] = useState();

  const user = useUser();

  useEffect(() => {
    if (user && user.displayName) {
      if (user.displayName === "professor") {
        setProf(true);
        setID(user.uid);
      } else {
        setProf(false);
        setID(user.email);
      }
    }
  }, [user]); // eslint-disable-line

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
            <Icon icon={homeAlt1} width="25" height="25" inline /> Home
          </span>
        </Link>
        {prof && (
          <Link href="/manage">
            <span>
              <Icon icon="ion:person" width="25" height="25" inline />
              Manage
            </span>
          </Link>
        )}
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
        {!prof && (
          <Link href="/sresults">
            <span>
              <Icon
                icon="fluent-mdl2:feedback-response-solid"
                width="25"
                height="20"
                inline
              />{" "}
              Results
            </span>
          </Link>
        )}
        {prof && (
          <Link href="/presults">
            <span>
              <Icon
                icon="fluent-mdl2:feedback-response-solid"
                width="25"
                height="20"
                inline
              />
              Results
            </span>
          </Link>
        )}
        <LoginStatus />
      </div>

      <main className={styles.main}>
        {prof !== undefined && id !== undefined && !courseChosen && (
          <SelectCourse
            prof={prof}
            id={id}
            setCourse={setCurrCourse}
            courseChosen={courseChosen}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && !topicsChosen && !submitted && (
          <ChooseTopic
            course={currCourse}
            setTopics={setTopics}
            setTopicsChosen={setTopicsChosen}
          />
        )}
        {courseChosen && topicsChosen && (
          <Quiz
            course={currCourse}
            topics={topics}
            complete={complete}
            submitted={submitted}
            setQuestions={setQuestions}
          />
        )}
        {courseChosen && submitted && (
          <ScoreReport questions={questions} course={currCourse} />
        )}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
