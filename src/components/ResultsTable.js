import useResults from "../hooks/useResults";
import PropTypes from "prop-types";
import useTopics from "../hooks/useTopics";
import Select from "react-select";
import { useState } from "react";
import styles from "../styles/topics.module.css";

export default function ResultsTable({ userID }) {
  const [selected, setSelected] = useState();

  const allTopics = useTopics();
  const topicsOptions = [];

  allTopics.forEach((t) => {
    const newObj = {};
    newObj["value"] = t;
    newObj["label"] = t;
    topicsOptions.push(newObj);
  });

  function handleSelect(data) {
    setSelected(data.value);
  }

  const results = useResults(userID);

  const filteredResults = results.filter((res) => {
    return res[selected] !== undefined;
  });

  const resultsTable = filteredResults.map((val) => (
    <tr key={val.id}>
      <td> {val.date} </td>
      <td>{val[selected]}</td>
    </tr>
  ));

  return (
    <div>
      <div className={styles.multiselect}>
        <Select
          options={topicsOptions}
          placeholder="Select topic to view past results"
          value={selected}
          isSearchable
          onChange={handleSelect}
          isMulti={false}
        />
      </div>
      {selected && (
        <div className="table">
          <table>
            <tr>
              <th> Date </th>
              <th> {selected} </th>
            </tr>
            {resultsTable}
          </table>
        </div>
      )}
    </div>
  );
}

ResultsTable.propTypes = {
  userID: PropTypes.string,
};
