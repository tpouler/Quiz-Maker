import Head from "next/head";
import styles from "../styles/index.module.css";
import LoginStatus from "../components/LoginStatus";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

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
import ResultsTable from "../components/ResultsTable";
import SelectCourse from "../components/selectCourse";

export default function SresultsMain() {
  const [prof, setProf] = useState(false);
  const [currCourse, setCurrCourse] = useState();
  const [courseChosen, setCourseChosen] = useState(false);

  const user = useUser();

  useEffect(() => {
    if (user && user.displayName) {
      if (user.displayName === "professor") {
        setProf(true);
      }
    }
  }, [user]); // eslint-disable-line
  if (user) {
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
            <span>
              <Icon icon={quizIcon} width="25" height="20" inline /> Quiz
            </span>
          </Link>
          {!prof && (
            <Link href="/sresults">
              <span className={styles.active}>
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

        <main>
          {!prof && !courseChosen && (
            <SelectCourse
              prof={prof}
              setCourse={setCurrCourse}
              setCourseChosen={setCourseChosen}
            />
          )}
          {!prof && courseChosen && (
            <ResultsTable userID={user.email} course={currCourse} />
          )}
        </main>
        <footer>A 312 project</footer>
      </div>
    );
  }
}
