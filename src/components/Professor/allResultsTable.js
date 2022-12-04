import PropTypes from "prop-types";
import tableStyles from "/Users/aliviakliesen/Desktop/CS312/project-potoo/src/styles/ResultsTable.module.css";
export default function AllResultsTable({ results }) {
  const resultsTable = results.map((res) => (
    <tr key={res.id}>
      <td> {res.date} </td>
      <td>{res.student}</td>
    </tr>
  ));

  return (
    <div>
      <div className={tableStyles.table}>
        <table>
          <tr>
            <th> Date </th>
            <th> Student </th>
          </tr>
          {resultsTable}
        </table>
      </div>
    </div>
  );
}

AllResultsTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};
