import { useState } from "react";
import PropTypes from "prop-types";
import "react-awesome-button/dist/styles.css";
export default function AddQuestion({submitted, topics, setSubmitted}){ // eslint-disable-line

    const [question, setQuestion] = useState(); // eslint-disable-line
    const [answer, setAnswer] = useState(); // eslint-disable-line

    const topicsList = topics.map((topic) => (
        <option id={topic} key={topic}> {topic} </option>
    ));

    const questionInput = ()=>{
        return(
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
        <select name="topics" id="topics">
            {topicsList}
            <option id="custom"> Add a new category </option>
        </select>
    </div>
    )};

const submit =()=>{
    setSubmitted(true)
}

return(
    <div> 
        {questionInput()}
        <button type="secondary" onClick={() => {submit()}} > Submit </button>
    </div>
);

}//function addQuestion bracket

AddQuestion.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.string),
    setSubmitted: PropTypes.func,
    submitted: PropTypes.bool,
};