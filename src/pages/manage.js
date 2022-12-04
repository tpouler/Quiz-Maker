import useCourses from "../hooks/useCourses";
import CourseTile from "../components/Professor/courseTile";

export default function ManageMain() {
  const currCourses = useCourses(true, "1");

  const courseTiles = currCourses.map((c) => <CourseTile key={c} course={c} />);

  return <div> {courseTiles} </div>;
}
