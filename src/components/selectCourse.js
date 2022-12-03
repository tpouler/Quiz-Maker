/*
  selectCourse.js
  This component will display a multi-select drop down menu for choosing a course
*/

import Select from "react-select";
import styles from "../styles/topics.module.css";
import { AwesomeButton } from "react-awesome-button";
import useCourses from "../hooks/useCourses";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function SelectCourse({ prof, setCourse, setCourseChosen }) {
  const user = useUser();

  const [currCourse, setCurrCourse] = useState();
  let id;
  if (prof) {
    id = user.uid;
  } else {
    id = user.email;
  }

  const coursesList = useCourses(prof, id);

  const coursesOptions = [];

  coursesList.forEach((c) => {
    const newObj = {};
    newObj["value"] = c;
    newObj["label"] = c;
    coursesOptions.push(newObj);
  });

  function handleSelect(data) {
    setCurrCourse(data);
  }

  const submitCourse = () => {
    setCourse(currCourse.value);
    setCourseChosen(true);
  };

  return (
    <div className={styles.multiselect}>
      <Select
        options={coursesOptions}
        placeholder="Select a course"
        value={currCourse}
        onChange={handleSelect}
        isSearchable
        isMulti={false}
        styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      />

      <br />
      <AwesomeButton
        type="secondary"
        disabled={currCourse === undefined}
        onReleased={() => {
          console.log("release");
          submitCourse();
        }}
      >
        Submit
      </AwesomeButton>
    </div>
  );
}

SelectCourse.propTypes = {
  prof: PropTypes.bool,
  setCourse: PropTypes.func,
  setCourseChosen: PropTypes.func,
};
