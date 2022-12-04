import useCourses from "../hooks/useCourses";
import CourseTile from "../components/Professor/courseTile";
import Head from "next/head";
import styles from "../styles/index.module.css";
import LoginStatus from "../components/LoginStatus";
import Link from "next/link";
import { Icon } from "@iconify/react";
import homeAlt1 from "@iconify/icons-akar-icons/home-alt1";
// eslint-disable-next-line quotes
import questionFill from "@iconify/icons-akar-icons/question-fill";
// eslint-disable-next-line quotes
import quizIcon from "@iconify/icons-material-symbols/quiz";
import { useState } from "react";

export default function ManageMain() {
  const [prof, setProf] = useState(true);
  setProf(true); //eventually this needs to be useEffect for user

  const currCourses = useCourses(true, "1");

  const courseTiles = currCourses.map((c) => <CourseTile key={c} course={c} />);

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
            <span className={styles.active}>
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

      <main>
        <div> {courseTiles} </div>
      </main>
      <footer> A 312 project </footer>
    </div>
  );
}
