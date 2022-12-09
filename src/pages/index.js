/* eslint-disable */
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

import Layout from "../components/Layout";

export default function Main() {
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
    <Layout prof={prof}>
      <h1 className={styles.h1}>Welcome to our quiz page!</h1>

      {/* <p>
          This is a page where you can practice your skills and continue to
          progress over time.
        </p> */}
      <div className={styles.info}>
        <Icon
          icon={questionFill}
          width="55"
          height="50"
          inline
          className={styles.disappear}
        />

        <span className={styles.extra_info}>
          {prof && (
            <span>
              <div>Manage -- This is where you can practice your skills</div>
              <br />
              <div>
                Professor -- This is where you can add questions to your quiz
              </div>
              <br />
            </span>
          )}
          <div>Quiz -- This is where you can practice your skills</div>
          {!prof && (
            <span>
              <br />
              <div>
                Results -- This is where you can add questions to your quiz
              </div>
            </span>
          )}
        </span>
      </div>
    </Layout>
  );
}
