import { useState } from "react";
import PropTypes from "prop-types";
import "react-awesome-button/dist/styles.css";
import { addQuestion } from "../../utils/firebase-utils.mjs";
import { useEffect } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "../../styles/index.module.css";
export default function AddQuestion({ topics, setSubmitted }) {
  // eslint-disable-line

  const [question, setQuestion] = useState(); // eslint-disable-line
  const [answer, setAnswer] = useState(); // eslint-disable-line
  const [topic, setTopic] = useState();
  const [newTopic, setNewTopic] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false); // eslint-disable-line

  function handleChange(e) {
    setAllowSubmit(true);
    if (e.target.value === "custom") {
      setNewTopic(true);
    } else {
      setNewTopic(false);
      setTopic(e.target.value);
    }
  }

  const topicsList = topics.map((t) => (
    <option id={t} key={t} value={t}>
      {" "}
      {t}{" "}
    </option>
  ));

  const questionInput = () => {
    return (
      <div>
        Question Input:
        <p>
          <input
            type={"Question"}
            placeholder="Write question here"
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
            className={styles.input}
          />
        </p>
        <p>
          <input
            type={"Answer"}
            placeholder="Write answer here"
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
            className={styles.input}
          />
        </p>
        <label htmlFor="topics"> Select a topic: </label>
        <select name="topics" id="topics" onChange={handleChange}>
          <option id="" value="" disabled selected hidden>
            {" "}
            Select an option...{" "}
          </option>
          {topicsList}
          <option id="custom" value="custom">
            {" "}
            Add a new category{" "}
          </option>
        </select>
        {newTopic && (
          <input
            required
            type="NewTopic"
            placeholder="Write new topic name here"
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
        )}
      </div>
    );
  };

  const submit = () => {
    if (
      (question !== undefined) &
      (question !== "") &
      (answer !== undefined) &
      (answer !== "")
    ) {
      const questionObj = {
        question: question,
        answer: answer,
        response: "",
        topic: topic,
      };
      addQuestion(questionObj);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    console.log(newTopic);
  }, [newTopic]);

  useEffect(() => {
    console.log(allowSubmit);
  }, [allowSubmit]);

  return (
    <div>
      {questionInput()}
      {allowSubmit && (
        <div>
          <br />
          <AwesomeButton
            type="secondary"
            onReleased={() => {
              submit();
            }}
          >
            Submit
          </AwesomeButton>
        </div>
      )}
    </div>
  );
} //function addQuestion bracket

AddQuestion.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
  setSubmitted: PropTypes.func,
  submitted: PropTypes.bool,
};
