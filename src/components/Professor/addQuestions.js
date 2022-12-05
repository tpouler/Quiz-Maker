import { useState } from "react";
import PropTypes from "prop-types";
import "react-awesome-button/dist/styles.css";
import { addQuestion } from "../../utils/firebase-utils.mjs";
import { useEffect } from "react";
import { AwesomeButton } from "react-awesome-button";
import styles from "../../styles/index.module.css";
import selectStyles from "../../styles/select.module.css";
import { useUser } from "../../contexts/UserContext";
import useTopics from "../../hooks/useTopics.js";
export default function AddQuestion({
  currCourse,
  setSubmitted,
  setCourseChosen,
}) {
  // eslint-disable-line

  const [question, setQuestion] = useState(); // eslint-disable-line
  const [answer, setAnswer] = useState(); // eslint-disable-line
  const [topic, setTopic] = useState();
  const [newTopic, setNewTopic] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false); // eslint-disable-line
  const user = useUser();

  function handleChange(e) {
    setAllowSubmit(true);
    if (e.target.value === "custom") {
      setNewTopic(true);
    } else {
      setNewTopic(false);
      setTopic(e.target.value);
    }
  }

  const topics = useTopics(currCourse);
  const topicsList = topics.map((t) => (
    <option id={t} key={t} value={t}>
      {t}
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
        {/* <label htmlFor="topics"> Select a topic: </label> */}
        <select
          className={selectStyles.select}
          name="topics"
          id="topics"
          onChange={handleChange}
        >
          <option id="" value="" disabled selected hidden>
            Select a topic
          </option>
          {topicsList}
          <option id="custom" value="custom">
            Add a new category
          </option>
        </select>
        {newTopic && (
          <div>
            <br />
            <input
              className={styles.input1}
              required
              type="NewTopic"
              placeholder="Write new topic name here"
              onChange={(event) => {
                setTopic(event.target.value);
              }}
            />
          </div>
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
        uid: user.uid,
        topic: topic,
        course: currCourse,
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
      <AwesomeButton
        type="secondary"
        onReleased={() => {
          setCourseChosen(false);
        }}
      >
        Change Course
      </AwesomeButton>
      <p> </p>
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
  currCourse: PropTypes.string,
  setSubmitted: PropTypes.func,
  setCourseChosen: PropTypes.func,
};
