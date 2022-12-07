/**
 * This hook sets up a listener that listens for changes in the sections collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of sections
 */

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

async function getQuestions(currCourse, topicsList, callback) {
  const db = getFirestore();
  const questionsFetched = [];
  for (let t = 0; t < topicsList.length; t++) {
    const topic = topicsList[t];
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
      questionsFetched.push(doc.data());
    });
  }
  callback(questionsFetched);
}
function useQuestions(currCourse, topicsList) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions(currCourse, topicsList, setQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCourse, topicsList]);

  return questions;
}

useQuestions.propTypes = {
  currCourse: PropTypes.object,
  topicsList: PropTypes.arrayOf(PropTypes.object),
};

export default useQuestions;
