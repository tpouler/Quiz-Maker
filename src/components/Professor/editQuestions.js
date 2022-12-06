import PropTypes from "prop-types";
import "react-awesome-button/dist/styles.css";
import { useState, useEffect } from "react";
import styles from "../../styles/index.module.css";
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";

export default function EditQuestion({
  currQuestion,
  setCurrQuestion,
  setSubmitted,
  complete,
  remove,
}) {
  // eslint-disable-line

  const [answer, setAnswer] = useState(currQuestion.answer);
  const [question, setQuestion] = useState(currQuestion.question);

  useEffect(() => {
    setAnswer(currQuestion.answer);
    setQuestion(currQuestion.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currQuestion]);

  function saveQuestion() {
    if (
      answer !== undefined &&
      question !== undefined &&
      answer !== "" &&
      question !== ""
    ) {
      const quest = {
        answer: answer,
        course: currQuestion.course,
        question: question,
        topic: currQuestion.topic,
        uid: currQuestion.uid,
      };
      complete(quest);
      setCurrQuestion();
      setSubmitted(true);
    }
  }

  function deleteQuestion() {
    remove(currQuestion);
    setCurrQuestion();
    setSubmitted(true);
  }

  return (
    <div>
      <p>Question:</p>
      <input
        className={styles.input}
        type="text"
        placeholder="Question must be set"
        value={question}
        onChange={(event) => {
          setQuestion(event.target.value);
        }}
      />
      <p>Answer:</p>
      <textarea
        className={styles.input}
        placeholder="Answer must be set"
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
        }}
      />
      <p> </p>
      <AwesomeButton
        onReleased={() => saveQuestion()}
        disabled={!answer || !question}
        type="primary"
      >
        Save
      </AwesomeButton>
      <div className={styles.divider} />
      <AwesomeButton type="danger" onReleased={() => setCurrQuestion()}>
        Cancel
      </AwesomeButton>
      <p />
      <AwesomeButton type="secondary" onReleased={() => deleteQuestion()}>
        Delete Question
      </AwesomeButton>
    </div>
  );
}

EditQuestion.propTypes = {
  currQuestion: PropTypes.object,
  setCurrQuestion: PropTypes.func,
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  setSubmitted: PropTypes.func,
};
