import useCourses from "../../hooks/useCourses";
import CourseTile from "./courseTile";
import PropTypes from "prop-types";

export default function CourseTiles({ prof, id }) {
  const currCourses = useCourses(prof, id);
  const courseTiles = currCourses.map((c) => <CourseTile key={c} course={c} />);

  return <div>{courseTiles}</div>;
}

CourseTiles.propTypes = {
  prof: PropTypes.bool,
  id: PropTypes.string,
};
