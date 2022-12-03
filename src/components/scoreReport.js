import PropTypes from "prop-types";
import { AwesomeButton } from "react-awesome-button";
import { useUser } from "../contexts/UserContext";
import { addResult } from "../utils/firebase-utils.mjs";
// import useTopics from "../hooks/useTopics";

export default function ScoreReport({ questions, course }) {
  const checkResponse = (question) => {
    return question.response === question.answer;
  };

  let numCorrect = 0;

  const newObj = {};
  questions.forEach((ques) => {
    if (newObj[ques.topic] === undefined) {
      newObj[ques.topic] = { corr: 0, total: 0 };
    }
    if (checkResponse(ques)) {
      newObj[ques.topic]["corr"] += 1;
      numCorrect++;
    }
    newObj[ques.topic]["total"] += 1;
  });

  const resultObj = {};
  Object.keys(newObj).forEach((t) => {
    const tScore = (newObj[t]["corr"] / newObj[t]["total"]) * 100;
    const roundedTScore = Number(tScore).toFixed(2);
    resultObj[t] = roundedTScore;
  });

  const userID = useUser().email;
  console.log(userID);
  addResult(resultObj, course, userID);

  const score = (numCorrect / questions.length) * 100;
  const roundedScore = Number(score).toFixed(2);

  return (
    <div>
      <h2> Results: </h2>
      <p>
        You got {numCorrect} out of {questions.length} correct! This is a score
        of {roundedScore} %.
      </p>
      <p>
        {" "}
        Check out all of your past quiz results in the Results tab in the top
        bar
      </p>
      <AwesomeButton type="secondary" href="http://localhost:3000/">
        Return Home
      </AwesomeButton>
    </div>
  );
}

ScoreReport.propTypes = {
  questions: PropTypes.array,
  course: PropTypes.string,
};
