/**
 * This hook sets up a listener that listens for changes in the quizResults collection in the database. The results are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of topics
 */

import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

function useStudents(course) {
  const [students, setStudents] = useState([]);
  const db = getFirestore();

  useEffect(
    () => {
      onSnapshot(doc(db, "courses", course), (document) => {
        setStudents([...document.data().students]);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return students;
}

export default useStudents;
