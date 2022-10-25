import PropTypes from "prop-types";

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
        of {(numCorrect / questions.length) * 100} %
      </p>
    </div>
  );
}

ScoreReport.propTypes = {
  questions: PropTypes.array,
};
