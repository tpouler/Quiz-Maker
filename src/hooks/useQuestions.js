/**
 * This hook sets up a listener that listens for changes in the sections collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of sections
 */

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

async function getQuestions(currCourse, topic, sectionsFetched, callback) {
  const db = getFirestore();
  const questions = collection(
    db,
    "courses",
    currCourse,
    "topics",
    topic,
    "questions"
  );
  const collectionSnapshot = await getDocs(questions);
  collectionSnapshot.forEach((doc) => {
    sectionsFetched.push(doc.data());
  });
  callback(sectionsFetched);
}
function useQuestions(currCourse, topicsList, setLoading) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setLoading(true);
    const sectionsFetched = [];
    topicsList.forEach((t) => {
      getQuestions(currCourse, t, sectionsFetched, setSections);
    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCourse, topicsList]);

  return sections;
}

useQuestions.propTypes = {
  topicsList: PropTypes.array,
};

export default useQuestions;
