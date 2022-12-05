/*
  topics.js
  This component will display a multi-select drop down menu for choosing quiz topics
*/

import Select from "react-select";
import useTopics from "../hooks/useTopics";
import { useState } from "react";
import styles from "../styles/topics.module.css";
import { AwesomeButton } from "react-awesome-button";
import PropTypes from "prop-types";

export default function Topics({ course, setTopics, setTopicsChosen }) {
  const [selected, setSelected] = useState();

  const topicsList = useTopics(course);

  const topicsOptions = [];

  topicsList.forEach((t) => {
    const newObj = {};
    newObj["value"] = t;
    newObj["label"] = t;
    topicsOptions.push(newObj);
  });

  function handleSelect(data) {
    setSelected(data);
  }

  const submitTopics = () => {
    if (selected !== undefined) {
      const newArr = [];
      selected.forEach((obj) => {
        newArr.push(obj.value);
      });
      setTopics(newArr);
      setTopicsChosen(true);
    }
  };

  return (
    <div className={styles.multiselect}>
      <Select
        options={topicsOptions}
        placeholder="Select at least one topic"
        value={selected}
        onChange={handleSelect}
        isSearchable
        isMulti
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      />

      <br />
      <AwesomeButton
        type="secondary"
        disabled={selected === null}
        onReleased={() => {
          console.log("release");
          submitTopics();
        }}
      >
        Submit
      </AwesomeButton>
    </div>
  );
}
Topics.propTypes = {
  setTopicsChosen: PropTypes.func,
  setTopics: PropTypes.func,
  course: PropTypes.string,
};
