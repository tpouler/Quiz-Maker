/**
 * This hook sets up a listener that listens for changes in the sections collection in the database. The sections are then stored in a local state variable and returned by calls to this function.
 *
 * @returns array of sections
 */

import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

function useQuestions() {
  const [sections, setSections] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    onSnapshot(
      collection(db, "questions", "Math", "questions"),
      (sectionList) => {
        const sectionsFetched = [];
        sectionList.docs.forEach((doc) => {
          // console.log("testing");
          //console.log(doc.data())
          sectionsFetched.push(doc.data());
        });
        //console.log(sectionsFetched);
        setSections(sectionsFetched);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return sections;
}

export default useQuestions;
