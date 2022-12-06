import PropTypes from "prop-types";
import useTopics from "../../hooks/useTopics.js";
import useQuestions from "../../hooks/useQuestions.js";
import EditQuestion from "./editQuestions.js";
import { useState } from "react";
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";
import styles from "../../styles/index.module.css";
import { updateQuestion, removeQuestion } from "../../utils/firebase-utils.mjs";

export default function QuestionsList({
  currCourse,
  setSubmitted,
  setCourseChosen,
}) {
  // eslint-disable-line
  const [currQuestion, setCurrQuestion] = useState();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const topics = useTopics(currCourse);
  const questions = useQuestions(currCourse, topics, setLoading);

  // console.log("topics")
  // console.log(topics);
  // console.log("questions")
  // console.log(questions);

  const listItems = questions.map((Q) => (
    <li
      className={styles.list_questions}
      key={Q.question}
      onClick={() => setCurrQuestion(Q)}
    >
      {Q.question}
    </li>
  ));
  async function complete(quest) {
    await updateQuestion(currQuestion, quest);
    setEditing(false);
  }
  async function remove(quest) {
    await removeQuestion(currQuestion, quest);
    setEditing(false);
  }

  if (!loading) {
    return (
      <div>
        {!currQuestion && (
          <div>
            <AwesomeButton
              type="secondary"
              onReleased={() => {
                setCourseChosen(false);
              }}
            >
              Change Course
            </AwesomeButton>
            <p> </p>
            <ul className={styles.ul_questions}>{listItems.sort()}</ul>
          </div>
        )}
        {currQuestion && !editing && (
          <div>
            <p>{currQuestion.question}</p>
            <AwesomeButton
              onReleased={() => {
                setEditing(true);
              }}
              type="primary"
            >
              Edit
            </AwesomeButton>
            <div className={styles.divider} />
            <AwesomeButton
              type="danger"
              onReleased={() => {
                setCurrQuestion();
              }}
            >
              Back
            </AwesomeButton>
          </div>
        )}
        {currQuestion && editing && (
          <div>
            <EditQuestion
              complete={complete}
              remove={remove}
              currQuestion={currQuestion}
              setCurrQuestion={setCurrQuestion}
              setSubmitted={setSubmitted}
            />
          </div>
        )}
      </div>
    );
  }
}

QuestionsList.propTypes = {
  currCourse: PropTypes.string,
  setSubmitted: PropTypes.func,
  setCourseChosen: PropTypes.func,
};
