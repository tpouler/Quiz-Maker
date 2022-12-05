import PropTypes from "prop-types";
import useAllresults from "../../hooks/useAllresults";

export default function AllResultsTable({ course }) {
  const res = useAllresults(course);
  console.log(res);

  return <div>placeholder text</div>;
}

AllResultsTable.propTypes = {
  course: PropTypes.string,
};
