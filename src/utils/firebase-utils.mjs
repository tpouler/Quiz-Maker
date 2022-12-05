// Import the functions you need from the SDKs you need

import { getApp, initializeApp } from "firebase/app";
import {
  initializeFirestore,
  connectFirestoreEmulator,
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator} from "firebase/auth";


// addDoc
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmBpPRwfoKmUCfUYpwasMR-WG0Q7IH2DU",
  authDomain: "potoo-40376.firebaseapp.com",
  projectId: "potoo-40376",
  storageBucket: "potoo-40376.appspot.com",
  messagingSenderId: "783644932424",
  appId: "1:783644932424:web:e5f82562101debd294db7d"
};

// Initialize Firebase

export function initializeFirebase() {
  try {
    return getApp();
  } catch (e) {
    // app has not been initialized
    const app = initializeApp(firebaseConfig);

    // initialize the database
    const db = initializeFirestore(app, { useFetchStreams: false });
    // connect up the emulator to the database
    if (
      process.env.NEXT_PUBLIC_EMULATE ||
      process.env.FIRESTORE_EMULATOR_HOST ||
      process.env.NODE_ENV === "test"
    ) {
      //console.log("Connecting to emulator");
      const auth = getAuth();
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFirestoreEmulator(db, "localhost", 8080);
    }
    return app;
  }
}

/**
 * This function adds a single question to the database
 *
 * @param {Object} question 
 * @return article with id set to document name
 */
export async function addQuestion(question) {
  const db = getFirestore();

  //console.log("Here testing");
  const copy = JSON.parse(JSON.stringify(question));

  const sectionsRef = collection(db, "questions");

  const section = question.topic;

  await setDoc(doc(sectionsRef, section), { section });

  const docref = await addDoc(collection(db, "questions", section, "questions"), copy);
  
  //await setDoc(doc(sectionsRef, section, "questions", docref.id), copy);

  return {
    question: question.question,
    answer: question.answer,
    response: question.response,
    topic: question.topic,
    id: docref.id
  };
}

export async function addResult(result, uid){
  const currDate = new Date();
  const resultData = { ...result,
    date: currDate.toLocaleString(),
  };
  const db = getFirestore();
  const resultsRef = collection(db,"results", uid, "quizResults");
  await addDoc(resultsRef, resultData);

  return {...resultData};
}

/**
 * This is a helper function for bulk loading a collection.
 *
 * The main reason to use this is for seeding or testing.
 *
 * @param {*} data - an Array of objects to be stored as documents
 * @param {string} collectionName  - the name of the collection
 */
export async function loadData(data) {
  console.log("here");
  await Promise.all(
    data.map(async (curr) => {
      await addQuestion(curr);
    })
  );
}

/**
 * This function is designed to remove all documents from a
 * collection. (It will not take care of sub collections).
 *
 * Its primary use is for testing.
 *
 * @param {string} collectionName
 */

//  export async function resetCollection(collectionRef) {
//   const docSnapshot = await getDocs(collectionRef);
//   //console.log("Do we get here?")
  
//   //docSnapshot.forEach((d) => (console.log(doc(collectionRef, d.data().id))));
//   await Promise.all(
//     docSnapshot.docs.map((d) => deleteDoc(doc(collectionRef, d.id)))
//   );
// }


/**
 * This function is designed to remove all documents from a
 * collection. (It will not take care of sub collections).
 *
 * Its primary use is for testing.
 *
 * @param {Object} collectionRef
 */
export async function clearCollection(collectionRef) {
  const docSnapshot = await getDocs(collectionRef);
  //console.log("Do we get here?")
  
  //docSnapshot.forEach((d) => (console.log(doc(collectionRef, d.data().id))));
  await Promise.all(
    docSnapshot.docs.map((d) => deleteDoc(doc(collectionRef, d.id)))
  );
}

/**
 * This function clears all data out of the database. This is only used for testing.
 */
export async function clearDatabase() {
  const db = getFirestore();

  // remove the sections
  const sectionsSnapshot = await getDocs(collection(db, "questions"));
  await Promise.all(
    sectionsSnapshot.docs.map(async (section) => {
      //console.log(section.data());
      await clearCollection(
        collection(db, "questions", section.data().section, "questions")
      );
      await deleteDoc(doc(db, "questions", section.data().section));
    })
  );
}
