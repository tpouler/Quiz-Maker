/*
  quiz.js

  This component will display the quiz and return the users answers.

    <div>
    <ul>{articleMap}</ul>
    </div>
*/

//Testing pushing

import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import styles from "../styles/index.module.css";

//Documentation to understand AwesomeButton
//https://github.com/rcaferati/react-awesome-button
import { AwesomeButton } from "react-awesome-button";
import useQuestions from "../hooks/useQuestions";

//This function gives us the html for each question and calls setAnswer
function AnswerInfo({ question, submitted, reset, resetQuestion }) {
  const [answer, setAnswer] = useState("");

  function setResponse(response) {
    setAnswer(response);
    question.response = response;
  }

  useEffect(() => {
    setAnswer("");
    resetQuestion(false);
  }, [reset, resetQuestion]);

  return (
    <div>
      {!submitted && (
        <input
          type="text"
          value={answer}
          onChange={(event) => {
            setResponse(event.target.value);
          }}
          placeholder="Please input a value..."
          className={styles.input}
        />
      )}
      {submitted && (
        <p
          className={styles.answer}
          style={
            question.response !== question.answer
              ? { background: "#ce564d" }
              : { background: "#4dcc77" }
          }
        >
          Your Answer: {answer}
        </p>
      )}
    </div>
  );
}
AnswerInfo.propTypes = {
  question: PropTypes.object,
  submitted: PropTypes.bool,
  reset: PropTypes.bool,
  resetQuestion: PropTypes.func,
};

export default function Quiz({
  course,
  topics,
  complete,
  submitted,
  setQuestions,
}) {
  const [reset, resetQuestion] = useState(false);
  const questions = useQuestions(course, topics);
  setQuestions(questions);

  const questionMap = questions.map((question) => (
    <div key={question.id}>
      {question.question}
      <br />
      <AnswerInfo
        question={question}
        submitted={submitted}
        reset={reset}
        resetQuestion={resetQuestion}
      />
      <br />
    </div>
  ));

  const Buttons = () => {
    return (
      <div>
        <AwesomeButton type="primary" onReleased={() => complete(questions)}>
          Submit
        </AwesomeButton>
        <div className={styles.divider} />
        <AwesomeButton type="danger" onReleased={() => resetQuestion(true)}>
          Reset
        </AwesomeButton>
      </div>
    );
  };

  return (
    <div>
      {questionMap}
      {!submitted && Buttons()}
    </div>
  );
}
Quiz.propTypes = {
  course: PropTypes.string,
  questions: PropTypes.array,
  complete: PropTypes.func,
  submitted: PropTypes.bool,
  topics: PropTypes.array,
  setQuestions: PropTypes.func,
};
