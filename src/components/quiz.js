/*
  quiz.js

  This component will display the quiz and return the users answers.

    <div>
    <ul>{articleMap}</ul>
    </div>
*/

import { useState } from "react";

import PropTypes from "prop-types";

//This function gives us the html for each question and calls setAnswer
function AnswerInfo({ answer, setAnswer }) {
  return (
    <textarea
      type="text"
      value={answer}
      onChange={(event) => {
        setAnswer(event.target.value);
      }}
    />
  );
}
AnswerInfo.propTypes = {
  answer: PropTypes.string,
  setAnswer: PropTypes.func,
};

export default function Quiz({ questions, complete }) {
  //Not sure how to update the "response" for each question when it changes
  const [response, setAnswer] = useState("");

  //What do we do with this?
  response;

  const questionMap = questions.map((question) => (
    <div key={question.id}>
      {question.question}
      <br />
      <AnswerInfo answer={question.response} setAnswer={setAnswer} />
      <br />
    </div>
  ));

  return (
    <div>
      {questionMap}

      <button type="save" value="Save" onClick={() => complete(questions)}>
        Submit
      </button>
    </div>
  );
}
Quiz.propTypes = {
  questions: PropTypes.array,
  complete: PropTypes.func,
};

/*
We may want to switch over to using a form eventually. It seems like this is a common approach.
    <div className="container">
        <form action="action_page.php">

            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.." />

            <label htmlFor="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px" />

            <input type="submit" value="Submit" />

        </form>
    </div>
*/
