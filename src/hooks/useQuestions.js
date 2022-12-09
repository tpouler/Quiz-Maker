/**
 * This hook sets up a listener that listens for changes in the sections collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of sections
 */

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

async function chooseQuestions(quests, tops, callback) {
  if (quests.length < 10) {
    callback(quests);
  } else {
    const finalArr = [];
    const qPerTopics = Math.floor(10 / tops.length);
    const topicsObj = {};

    for (let t = 0; t < tops.length; t++) {
      const topic = tops[t];
      topicsObj[topic] = { full: false, count: 0 };
    }

    let sorted = [];
    for (let q = 0; q < quests.length; q++) {
      const quest = quests[q];
      sorted.push({ ...quest, sort: Math.random() });
    }

    sorted = sorted.sort((q1, q2) => {
      return q1.sort - q2.sort;
    });

    for (let s = 0; s < sorted.length; s++) {
      const q = sorted[s];
      const currTopic = q.topic;
      if (topicsObj[currTopic].full === false) {
        finalArr.push({ ...q });
        topicsObj[currTopic].count += 1;
        if (topicsObj[currTopic].count === qPerTopics) {
          topicsObj[currTopic].full = true;
        }
      }
    }

    await callback(finalArr);
  }
}

async function getQuestions(currCourse, topicsList, callback, quizBool) {
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
  if (quizBool) {
    await chooseQuestions(questionsFetched, topicsList, callback, quizBool);
  } else {
    callback(questionsFetched);
  }
}
function useQuestions(currCourse, topicsList, quizBool) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions(currCourse, topicsList, setQuestions, quizBool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCourse, topicsList]);

  return questions;
}

useQuestions.propTypes = {
  currCourse: PropTypes.object,
  topicsList: PropTypes.arrayOf(PropTypes.object),
};

export default useQuestions;
