import questions from "../../data/seed.json";

import { doc, getFirestore, terminate, getDoc } from "firebase/firestore";

import {
  initializeFirebase,
  clearDatabase,
  loadData,
  addQuestion,
} from "../utils/firebase-utils.mjs";

/*
My function imports:
updateArticle,

Firestore Imports:
query,
collection,
where,
getDocs,
*/

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
        id: "10",
        question: "10 + 10?",
        answer: "10",
        response: "",
        topic: "Math",
      };

      let snapshot = await getDoc(
        doc(db, "subjects", newQuestion.topic, "questions", newQuestion.id)
      );

      expect(snapshot.exists()).toBeFalsy();

      await addQuestion({ ...newQuestion });

      // make sure the article is in the database
      snapshot = await getDoc(
        doc(db, "subjects", newQuestion.topic, "questions", newQuestion.id)
      );

      expect(snapshot.exists()).toBeTruthy();

      // make sure the article has the right values
      const fetchedQuestion = snapshot.data();
      expect(fetchedQuestion.id).toBe(newQuestion.id);
      expect(fetchedQuestion.question).toBe(newQuestion.question);
      expect(fetchedQuestion.answer).toBe(newQuestion.answer);
    });

    test("addQuestion: Adding question add new section", async () => {
      const newQuestion = {
        id: "12",
        question: "10 + 12?",
        answer: "12",
        response: "",
        topic: "Science",
      };
      // make sure the section does exist before
      let snapshot = await getDoc(
        doc(db, "subjects", newQuestion.topic, "questions", newQuestion.id)
      );
      expect(snapshot.exists()).toBeFalsy();

      await addArticle({ ...newQuestion });

      // the section should now exist
      snapshot = await getDoc(
        doc(db, "subjects", newQuestion.topic, "questions", newQuestion.id)
      );
      expect(snapshot.exists()).toBeTruthy();

      // make sure the title has the right values
      const fetchedQuestion = snapshot.data();
      expect(fetchedQuestion.id).toBe(newQuestion.id);
      expect(fetchedQuestion.question).toBe(newQuestion.question);
      expect(fetchedQuestion.answer).toBe(newQuestion.answer);
    });
  });
});
