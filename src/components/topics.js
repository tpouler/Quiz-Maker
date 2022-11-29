/*
  topics.js
  This component will display a multi-select drop down menu for choosing quiz topics
*/

import Select from "react-select";
import useTopics from "../hooks/useTopics";
import { useState } from "react";
import styles from "../styles/topics.module.css";

export default function Topics() {
  const [selected, setSelected] = useState();

  const topics = useTopics();

  const topicsOptions = [];

  topics.forEach((t) => {
    const newObj = {};
    newObj["value"] = t;
    newObj["label"] = t;
    topicsOptions.push(newObj);
  });

  function handleSelect(data) {
    setSelected(data);
  }

  return (
    <div className={styles.multiselect}>
      <Select
        options={topicsOptions}
        placeholder="Select at least one topic"
        value={selected}
        onChange={handleSelect}
        isSearchable
        isMulti
      />
    </div>
  );
}
