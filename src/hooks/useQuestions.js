/**
 * This hook sets up a listener that listens for changes in the sections collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of sections
 */

import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
function useQuestions(currCourse, topicsList) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const sectionsFetched = [];
    const db = getFirestore();
    topicsList.forEach((t) => {
      onSnapshot(
        collection(db, "courses", currCourse, "topics", t, "questions"),
        (sectionList) => {
          sectionList.docs.forEach((doc) => {
            sectionsFetched.push(doc.data());
          });
          setSections(sectionsFetched);
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sections;
}

useQuestions.propTypes = {
  topicsList: PropTypes.array,
};

export default useQuestions;
