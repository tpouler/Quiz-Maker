import useCourses from "../hooks/useCourses";

export default function ManageMain() {
  const currCourses = useCourses(true, "1");

  const courseTiles = currCourses.map((c) => (
    <div key={c} className="coursetile">
      {c}
    </div>
  ));

  return <div> {courseTiles} </div>;
}
