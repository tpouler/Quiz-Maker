// Import the functions you need from the SDKs you need

import { getApp, initializeApp } from "firebase/app";
import {  initializeFirestore, connectFirestoreEmulator, getFirestore, collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

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

export function initializeFirebase(){
  try{
    return getApp();
  } catch (e){
    // app has not been initialized
    const app = initializeApp(firebaseConfig);

    // initialize the database
    const db = initializeFirestore(app, {useFetchStreams: false})
    // connect up the emulator to the database
    if (process.env.NEXT_PUBLIC_EMULATE || process.env.FIRESTORE_EMULATOR_HOST){
      console.log("Connecting to emulator");
      connectFirestoreEmulator(db, "localhost", 8080 );
    }
    return app;
  }
}

/**
 * This function adds a single article to the database
 * 
 * @param {Object} article
 * @return article with id set to document name
 */
 export async function addQuestion(question){
  const db = getFirestore();

  const copy = JSON.parse(JSON.stringify(question));
  delete copy.topic;

  const sectionsRef = collection(db, "questions");

  const section = question.topic;

  await setDoc(doc(sectionsRef, section), {section});

  //console.log(articleTitle.title)
  await setDoc(doc(sectionsRef, section, "questions", question.id), copy);

  return {
    id: question.id,
    question: question.question,
    answer: question.answer,
    response: question.response,
    topic: question.topic
  };
}

/**
 * This is a helper function for bulk loading a collection. 
 * 
 * The main reason to use this is for seeding or testing.
 * 
 * @param {*} data - an Array of objects to be stored as documents
 * @param {string} collectionName  - the name of the collection
 */
export async function loadData(data){

  const db = getFirestore();
  const questions = new Map();

  const collectionRef = collection(db, "questions");
  // record the title and id
  
  data.forEach((curr) => {
    const copy = JSON.parse(JSON.stringify(curr));
    delete copy.topic;
    //const reference = {id: curr.id, topic: curr.topic }
    if (questions.has(curr.topic)){
      questions.get(curr.topic).push(copy);
    }else{
      questions.set(curr.topic, [copy])
    }
  })

  //console.log(questions);

  const sectionNames = Array.from(questions.keys());

  //console.log(sectionNames)

  await Promise.all(sectionNames.map(async (section) => {
    const titles = questions.get(section);

    await setDoc(doc(collectionRef, section), {section});

    await Promise.all(titles.map(async q => {
      await setDoc(doc(collectionRef, section, "questions", q.id), q);
    }))
  }));
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
 export async function clearCollection(collectionRef){
  const docSnapshot = await getDocs(collectionRef);
  //docSnapshot.forEach((d) => (console.log(doc(collectionRef, d.data().id))));
  await Promise.all(docSnapshot.docs.map((d)=>(
    deleteDoc(doc(collectionRef, d.data().id))
  )));
}




/**
 * This function clears all data out of the database. This is only used for testing.
 */
export async function clearDatabase(){
  const db = getFirestore();

  // remove the sections
  const sectionsSnapshot = await getDocs(collection(db, "subjects"));
  await Promise.all(sectionsSnapshot.docs.map(async (section)=>{
    //console.log(section.data());
    await clearCollection(collection(db, "subjects", section.data().section, "questions"));
    await deleteDoc(doc(db, "subjects", section.data().section));
  }));
}
