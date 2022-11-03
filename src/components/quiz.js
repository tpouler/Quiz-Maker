/*
  quiz.js

  This component will display the quiz and return the users answers.

    <div>
    <ul>{articleMap}</ul>
    </div>
*/

import { useState } from "react";

import PropTypes from "prop-types";

import styles from "../styles/index.module.css";

//Documentation to understand AwesomeButton
//https://github.com/rcaferati/react-awesome-button
import { AwesomeButton } from "react-awesome-button";

// eslint-disable-next-line quotes
import "react-awesome-button/dist/styles.css";

//This function gives us the html for each question and calls setAnswer
function AnswerInfo({ question, submitted }) {
  const [answer, setAnswer] = useState("");

  function setResponse(response) {
    setAnswer(response);
    question.response = response;
  }

  return (
    <div>
      {!submitted && (
        <textarea
          type="text"
          value={answer}
          placeholder="Please input a value..."
          cols="50"
          onChange={(event) => {
            setResponse(event.target.value);
          }}
        />
      )}
      {submitted && (
        <p
          className={styles.answer}
          style={
            question.response !== question.answer
              ? { background: "red" }
              : { background: "green" }
          }
        >
          Your Answer: {answer}
        </p>
      )}
      <br />
    </div>
  );
}
AnswerInfo.propTypes = {
  question: PropTypes.object,
  submitted: PropTypes.bool,
};

export default function Quiz({ questions, complete, submitted }) {
  const questionMap = questions.map((question) => (
    <div key={question.id}>
      {question.question}
      <br />
      <AnswerInfo question={question} submitted={submitted} />
      <br />
    </div>
  ));

  const Buttons = () => {
    return (
      <div>
        <AwesomeButton type="secondary" onReleased={() => complete(questions)}>
          Submit
        </AwesomeButton>
        <div className={styles.divider} />
        <AwesomeButton type="danger">Exit</AwesomeButton>
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
  questions: PropTypes.array,
  complete: PropTypes.func,
  submitted: PropTypes.bool,
};
