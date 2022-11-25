// import questions from "../../data/seed.json";

import { getFirestore, terminate } from "firebase/firestore";

import useQuestions from "./useQuestions.js";

import {
  initializeFirebase,
  clearDatabase,
  //   loadData,
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
  });

  describe("Hook: retrieving multiple sections", () => {
    test("addQuestion: Adding question adds the question in the correct section", async () => {
      const questions = useQuestions(["Math", "Science"]);
      const Math = {
        question: "10 + 10?",
        answer: "10",
        response: "",
        topic: "Math",
      };

      const Science = {
        question: "Here's a Science Question",
        answer: "0",
        response: "",
        topic: "Science",
      };

      await addQuestion({ ...Math });
      await addQuestion({ ...Science });

      expect(questions.exists()).toBeTruthy();

      expect(questions.length).toBe(2);
    });
  });
});
