

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
  updateDoc,
  arrayUnion,
  arrayRemove
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
      const auth = getAuth(app);
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
export async function addQuestion(question){
  const db = getFirestore();

  const copy = JSON.parse(JSON.stringify(question));

  let ref = collection(db, "courses");
  await setDoc(doc(ref, question.course), {id: question.uid, name: question.course, students: arrayUnion()}, {merge: true});
  ref = collection(db, "courses",question.course, "topics");
  await setDoc(doc(ref, question.topic), {name: question.topic});
  ref = collection(db, "courses", question.course, "topics", question.topic, "questions");
  const docRef = await addDoc(ref, copy);

  return {
    question: question.question,
    answer: question.answer,
    response: question.response,
    topic: question.topic,
    id: docRef.id,
    course: question.course,
    uid: question.uid
  }

}

export async function addStudent(course, email) {
  const db = getFirestore();

  const ref = doc(db, "courses", course);
  await updateDoc(ref, {
    students: arrayUnion(email)
  })
}

export async function removeStudent(course, email){
  const db = getFirestore();

  const ref = doc(db, "courses", course);
  await updateDoc(ref, {
    students: arrayRemove(email)
  })
}

export async function addCourse(uid, courseTitle){
  const db = getFirestore();

  await setDoc(doc(db, "courses", courseTitle), {name: courseTitle, id: uid, students:[] })
}

// export async function addQuestion(question) {
//   const db = getFirestore();

//   //console.log("Here testing");
//   const copy = JSON.parse(JSON.stringify(question));

//   const sectionsRef = collection(db, "questions");

//   const section = question.topic;

//   await setDoc(doc(sectionsRef, section), { section });

//   const docref = await addDoc(collection(db, "questions", section, "questions"), copy);
  
//   //await setDoc(doc(sectionsRef, section, "questions", docref.id), copy);

//   return {
//     question: question.question,
//     answer: question.answer,
//     response: question.response,
//     topic: question.topic,
//     id: docref.id
//   };
// }

export async function addResult(result, course, email){
  const currDate = new Date();
  const resultData = { ...result,
    student: email,
    course: course,
    date: currDate.toLocaleString(),
  };
  const db = getFirestore();

  await setDoc(doc(db, "courses", course, "results", email), {"email": email}, {merge:true});
  const resultsRef = collection(db, "courses", course, "results", email, "quizResults");
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
// export async function clearCollection(collectionName){
//   const db = getFirestore();
//   const docSnapshot = await getDocs(collection(db, collectionName));
//   await Promise.all(docSnapshot.docs.map((d)=>{
//     return deleteDoc(doc(db, "questions", d.id))
//   }));
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

/** 
export async function clearDatabase(){
  const db = getFirestore();

  const coursesSnap = await getDocs(collection(db, "courses"));

  await coursesSnap.forEach(async (course) => {
    const topicsSnap = await getDocs(collection(db, "courses", course.data().name, "topics"));
   await topicsSnap.forEach(async (top) => {
       await clearCollection(collection(db, "courses", course.data().name, "topics", top.data().name, "questions"));
       await top.ref.delete();
    });
  });
}
*/

