import PropTypes from "prop-types";
import { AwesomeButton } from "react-awesome-button";

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
      <AwesomeButton type="secondary" href="http://localhost:3000/">
        Return Home
      </AwesomeButton>
    </div>
  );
}

ScoreReport.propTypes = {
  questions: PropTypes.array,
};
