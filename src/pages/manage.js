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
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import CourseTiles from "../components/Professor/courseTiles";
import Collapsible from "react-collapsible";
import { addCourse } from "../utils/firebase-utils.mjs";
import inputStyle from "../styles/inputBox.module.css";
import manage from "../styles/manage.module.css";

export default function ManageMain() {
  const [prof, setProf] = useState(true);
  const [id, setID] = useState();
  const [courseTitle, setCourseTitle] = useState();

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

  const handleClick = async () => {
    await addCourse(id, courseTitle);
    location.reload();
  };
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

      <main className={styles.main}>
        {prof && id !== undefined && <CourseTiles prof={prof} id={id} />}
        {prof && id !== undefined && (
          <div className={manage.newcourse}>
            <Collapsible trigger="Add a new course +">
              <input
                placeholder="Enter new course name"
                onChange={(event) => {
                  setCourseTitle(event.target.value);
                }}
                className={inputStyle.input}
              />
              <button onClick={() => handleClick()}> Create New Course </button>
            </Collapsible>
          </div>
        )}
      </main>
      <footer> A 312 project </footer>
    </div>
  );
}
