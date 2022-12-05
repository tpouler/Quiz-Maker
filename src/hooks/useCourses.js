import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useCourses(prof, id) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const coursesFetched = [];
    const db = getFirestore();
    onSnapshot(collection(db, "courses"), (coursesList) => {
      coursesList.docs.forEach((doc) => {
        if (prof) {
          if (doc.data().id === id || doc.data().id === "1") {
            coursesFetched.push(doc.data().name);
          }
        } else {
          if (
            doc.data().students.some((s) => s === id) ||
            doc.data.id === "1"
          ) {
            console.log("student found!!!");
            coursesFetched.push(doc.data().name);
          }
        }
      });
      setSections(coursesFetched);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sections;
}
useCourses.propTypes = {
  prof: PropTypes.bool,
  uid: PropTypes.string,
};

export default useCourses;
