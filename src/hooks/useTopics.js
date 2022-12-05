/**
 * This hook sets up a listener that listens for changes in the topics collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of topics
 */

import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

function useTopics(currCourse) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const topicsFetched = [];
    const db = getFirestore();
    const snap = onSnapshot(
      collection(db, "courses", currCourse, "topics"),
      (topicsList) => {
        topicsList.docs.forEach((doc) => {
          topicsFetched.push(doc.data().name);
        });
        setTopics(topicsFetched);
      }
    );
    return snap;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return topics;
}

export default useTopics;
