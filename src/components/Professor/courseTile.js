import style from "../../styles/manage.module.css";
import inputStyle from "../../styles/inputBox.module.css";
import Collapsible from "react-collapsible";
import PropTypes from "prop-types";
import useStudents from "../../hooks/useStudents";
import { addStudent, removeStudent } from "../../utils/firebase-utils.mjs";
import { useState } from "react";

export default function CourseTile({ course }) {
  const [email, setEmail] = useState();

  const students = useStudents(course);
  const studentList = students.map((s) => (
    <li className={style.li} key={s}>
      {s} {"    "}
      <button onClick={() => removeStudent(course, s)}> remove </button>
    </li>
  ));

  return (
    <div key={course} className={style.coursetile}>
      <Collapsible trigger={`${course} Roster`}>
        <ul>
          {studentList}
          <li className={style.li} key="add">
            <input
              placeholder="Enter student email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className={inputStyle.input}
            />
            <button onClick={() => addStudent(course, email)}> add </button>
          </li>
        </ul>
      </Collapsible>
    </div>
  );
}

CourseTile.propTypes = {
  course: PropTypes.string,
};
