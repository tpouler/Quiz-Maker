import useResults from "../hooks/useResults";
import PropTypes from "prop-types";

export default function ResultsTable({ userID }) {
  const results = useResults(userID);
  const resultsTable = results.map((val) => (
    <tr key={val.id}>
      <td>{val.date}</td>
      <td>{val.score}</td>
    </tr>
  ));

  return (
    <div className="table">
      <table>
        <tr>
          <th> Date </th>
          <th> Score </th>
        </tr>
        {resultsTable}
      </table>
    </div>
  );
}

ResultsTable.propTypes = {
  userID: PropTypes.string,
};
