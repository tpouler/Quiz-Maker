import AllResultsTable from "../components/Professor/allResultsTable";
import styles from "../styles/index.module.css";
import LoginStatus from "../components/LoginStatus";
import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";
// eslint-disable-next-line quotes
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import { useEffect, useState } from "react";
import quizIcon from "@iconify/icons-material-symbols/quiz";
import { useUser } from "../contexts/UserContext";
import SelectCourse from "../components/selectCourse";

export default function PresultsMain() {
  const [prof, setProf] = useState();
  const [id, setID] = useState();
  const [course, setCourse] = useState();
  const [courseChosen, setCourseChosen] = useState(false);
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
            <span>
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
          {prof !== undefined && id !== undefined && !courseChosen && (
            <SelectCourse
              prof={prof}
              id={id}
              setCourse={setCourse}
              setCourseChosen={setCourseChosen}
            />
          )}

          {prof && courseChosen && <AllResultsTable course={course} />}
        </main>
        <footer>A 312 project</footer>
      </div>
    );
  }
}
