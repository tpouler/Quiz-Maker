import questions from "../../data/seed.json";

import { doc, getFirestore, terminate, getDoc } from "firebase/firestore";

import {
  initializeFirebase,
  clearDatabase,
  loadData,
  addQuestion,
} from "../utils/firebase-utils.mjs";

jest.setTimeout(8000);

describe("Firestore utility functions test", () => {
  let db;
  beforeAll(() => {
    initializeFirebase();
    db = getFirestore();
  });

  afterAll(async () => {
    await terminate(db);
  });

  beforeEach(async () => {
    // clear out any old data
    await clearDatabase();

    // load the test films
    await loadData(questions);
  });

  describe("addQuestion: addQuestion tests", () => {
    test("addQuestion: Adding question adds the question in the correct section", async () => {
      const newQuestion = {
        question: "10 + 10?",
        answer: "10",
        response: "",
        topic: "Math",
      };

      //console.log("testing");

      const addedQuestion = await addQuestion({ ...newQuestion });

      // console.log("In test 1");
      // console.log(addedQuestion);

      // make sure the article is in the database
      const snapshot = await getDoc(
        doc(db, "questions", newQuestion.topic, "questions", addedQuestion.id)
      );

      expect(snapshot.exists()).toBeTruthy();

      // make sure the article has the right values
      const fetchedQuestion = snapshot.data();
      expect(fetchedQuestion.question).toBe(newQuestion.question);
      expect(fetchedQuestion.answer).toBe(newQuestion.answer);
    });

    test("addQuestion: Adding question add new section", async () => {
      const newQuestion = {
        question: "2 + 10?",
        answer: "12",
        response: "",
        topic: "Science",
      };

      const addedQuestion = await addQuestion({ ...newQuestion });

      // the section should now exist
      const snapshot = await getDoc(
        doc(db, "questions", newQuestion.topic, "questions", addedQuestion.id)
      );
      expect(snapshot.exists()).toBeTruthy();

      // make sure the title has the right values
      const fetchedQuestion = snapshot.data();
      expect(fetchedQuestion.question).toBe(newQuestion.question);
      expect(fetchedQuestion.answer).toBe(newQuestion.answer);
    });
  });
});
