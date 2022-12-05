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

//Testing

export default function Main() {
  //console.log(`boolean of answer submitted is: ${submitted}`);
  const [prof, setProf] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user && user.displayName) {
      if (user.displayName === "professor") {
        setProf(true);
      }
    }
  }, [user]); // eslint-disable-line

  return (
    <div className={styles.header}>
      <Head>
        <title>Potoo project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.topnav}>
        <Link href="/">
          <span className={styles.active}>
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

      <h1>Welcome to our quiz page!</h1>
      <p>
        This is a page where you can practice your skills and continue to
        progress over time.
      </p>
      <br />
      <p>Please click one of the options from the nav bar above.</p>
      <br />
      <div>Professor</div>
      <div>This is where you can add questions to your quiz</div>
      <br />
      <div>Quiz</div>
      <div>This is where you can practice your skills</div>
      <br />
      <div> </div>
      <footer>A 312 project</footer>
    </div>
  );
}
