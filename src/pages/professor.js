import Head from "next/head";
import styles from "../styles/index.module.css";
import { Icon } from "@iconify/react";
import AddQuestion from "../components/Professor/addQuestions";
import QuestionsList from "../components/Professor/questionsList";
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
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";

// import {loadData, clearDatabase} from "../utils/firebase-utils.mjs";
// import data from "../../data/seed.json";

//Documentation to understand AwesomeButton
//https://github.com/rcaferati/react-awesome-button
//import { AwesomeButton } from "react-awesome-button";

// function loadQuestions() {
//   loadData(data);
// }

export default function ProfessorMain() {
  const [submitted, setSubmitted] = useState();
  const [currCourse, setCurrCourse] = useState();
  const [courseChosen, setCourseChosen] = useState(false);
  const [addEdit, setAE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [prof, setProf] = useState();
  const [id, setID] = useState();

  const user = useUser();

  useEffect(() => {}, [submitted]); // eslint-disable-line

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

  if (courseChosen === false && addEdit !== false) {
    setAE(false);
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
            <span className={styles.active}>
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
        {!courseChosen && <h1 className="title">Add/Edit Questions</h1>}
        {courseChosen && !addEdit && (
          <div>
            <h1 className="title"> Add/Edit Questions for {currCourse}</h1>
            <p>
              <AwesomeButton
                type="secondary"
                onReleased={() => {
                  setCourseChosen(false);
                }}
              >
                Change Course
              </AwesomeButton>
            </p>
          </div>
        )}
        {courseChosen && addEdit && !edit && (
          <h1 className="title">Add Questions for {currCourse}</h1>
        )}
        {courseChosen && addEdit && edit && (
          <h1 className="title">Edit Questions for {currCourse}</h1>
        )}
        {prof !== undefined && id !== undefined && !courseChosen && (
          <SelectCourse
            prof={prof}
            id={id}
            setCourse={setCurrCourse}
            courseChosen={courseChosen}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && !submitted && !addEdit && (
          <div>
            <AwesomeButton
              type="primary"
              onReleased={() => {
                setAE(true);
                setEdit(false);
              }}
            >
              Add
            </AwesomeButton>
            <div className={styles.divider} />

            <AwesomeButton
              type="secondary"
              onReleased={() => {
                setAE(true);
                setEdit(true);
              }}
            >
              Edit
            </AwesomeButton>
          </div>
        )}
        {courseChosen && !submitted && addEdit && !edit && (
          <AddQuestion
            currCourse={currCourse}
            setSubmitted={setSubmitted}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && !submitted && addEdit && edit && (
          <QuestionsList
            currCourse={currCourse}
            setSubmitted={setSubmitted}
            setCourseChosen={setCourseChosen}
          />
        )}
        {courseChosen && submitted && (
          <SubmittedQuestions setSubmitted={setSubmitted} edit={edit} />
        )}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}

//        <main>
//           <span>
//             <h1 className="title">Add Questions</h1>
//             <AddQuestion
//               topics={topicsList}
//               setSubmitted={setSubmitted}
//               submitted={submitted}
//             />
//           </span>
//           <br />
//           <span>
//             {/* <AwesomeButton type="primary" onReleased={() => loadQuestions()}>
//               Load Questions
//             </AwesomeButton>
//             <div className={styles.divider} />
//             <AwesomeButton type="primary" onReleased={() => clearDatabase()}>
//               Reset Questions
//             </AwesomeButton> */}
//           </span>
//         </main>
