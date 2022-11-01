import PropTypes from "prop-types";
import styles from "../styles/index.module.css";

export default function ScoreReport({ questions }) {
  const checkResponse = (question) => {
    return question.response === question.answer;
  };

  let numCorrect = 0;

  questions.forEach((d) => {
    if (checkResponse(d)) {
      numCorrect++;
    }
  });

  return (
    <div>
      <h2> Results: </h2>
      <p>
        You got {numCorrect} out of {questions.length} correct! This is a score
        of {(numCorrect / questions.length) * 100} %.
      </p>
      <button className={styles.button} type="return" value="Return">
        Return to Home
      </button>
    </div>
  );
}

ScoreReport.propTypes = {
  questions: PropTypes.array,
};
