/**
 * This hook sets up a listener that listens for changes in the quizResults collection in the database. The results are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of topics
 */

import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

function useResults(uid) {
  const [results, setResults] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const resultsFetched = [];
    onSnapshot(collection(db, "results", uid, "quizResults"), (resultsList) => {
      resultsList.docs.forEach((doc) => {
        console.log("testing");
        console.log(doc.data());
        resultsFetched.push(doc.data());
      });
      setResults(resultsFetched);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(results);
  return results;
}

export default useResults;
