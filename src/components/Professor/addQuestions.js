import { useState } from "react";
import PropTypes from "prop-types";
import "react-awesome-button/dist/styles.css";
import { addQuestion } from "../../utils/firebase-utils.mjs";
import { useEffect } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
export default function AddQuestion({ topics, setSubmitted }) {
  // eslint-disable-line

  const [question, setQuestion] = useState(); // eslint-disable-line
  const [answer, setAnswer] = useState(); // eslint-disable-line
  const [topic, setTopic] = useState();
  const [newTopic, setNewTopic] = useState(false);

  function handleChange(e) {
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
        question input:
        <p>
          <input
            type={"Question"}
            placeholder="Write question here"
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            type={"Answer"}
            placeholder="Write answer here"
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
          />
        </p>
        <label htmlFor="topics"> Select a topic: </label>
        <select name="topics" id="topics" onChange={handleChange}>
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

  async function createID(inputTopic) {
    const db = getFirestore();
    let id = 0;
    if (!newTopic) {
      const topicSnapshot = await getDocs(collection(db, inputTopic));
      const topicsArr = [];
      topicSnapshot.forEach((document) => {
        topicsArr.push({ ...document.data() });
      });

      let greatestID = 0;
      for (let i = 0; i < topicsArr.length; i++) {
        if (topicsArr[i].id > greatestID) {
          greatestID = topicsArr[i].id;
        }
      }

      id = greatestID + 1;
    }
    return id.toString();
  }

  const submit = () => {
    if (
      (question !== undefined) &
      (question !== "") &
      (answer !== undefined) &
      (answer !== "")
    ) {
      console.log("topic:");
      console.log(topic);
      id = createID(topic);

      const questionObj = {
        id: "7",
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

  return (
    <div>
      {questionInput()}
      <button
        type="secondary"
        onClick={() => {
          submit();
        }}
      >
        {" "}
        Submit{" "}
      </button>
    </div>
  );
} //function addQuestion bracket

AddQuestion.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
  setSubmitted: PropTypes.func,
  submitted: PropTypes.bool,
};
