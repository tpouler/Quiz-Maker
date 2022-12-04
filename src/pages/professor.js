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
import Link from "next/link";
import { useEffect } from "react";
import SelectCourse from "../components/selectCourse";
import { useUser } from "../contexts/UserContext";

export default function ProfessorMain() {
  const [submitted, setSubmitted] = useState();
  const [currCourse, setCurrCourse] = useState();
  const [courseChosen, setCourseChosen] = useState(false);
  const [prof, setProf] = useState(true);

  const user = useUser();

  useEffect(() => {}, [submitted]); // eslint-disable-line

  useEffect(() => {
    if (user && user.displayName) {
      if (user.displayName === "professor") {
        setProf(true);
      }
    }
  }, [user]);

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
        {!courseChosen && <h1 className="title">Add Questions</h1>}
        {courseChosen && (
          <h1 className="title"> Add Questions for {currCourse}</h1>
        )}
        {!courseChosen && (
          <SelectCourse
            prof={prof}
            setCourse={setCurrCourse}
            courseChosen={courseChosen}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && !submitted && (
          <AddQuestion
            currCourse={currCourse}
            setSubmitted={setSubmitted}
            submitted={submitted}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && submitted && (
          <SubmittedQuestions
            setSubmitted={setSubmitted}
            submitted={submitted}
          />
        )}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
