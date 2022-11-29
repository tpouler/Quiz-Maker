import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import styles from "../styles/index.module.css";
import { AwesomeButton } from "react-awesome-button";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [prof, setProf] = useState(false);

  const handleLogin = async () => {
    const auth = getAuth();

    if (newUser) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const a = getAuth();
        const user = a.currentUser;
        if (prof) {
          await updateProfile(user, { displayName: "professor" });
        } else {
          await updateProfile(user, { displayName: "student" });
        }
        router.push("/");
      } catch (error) {
        if (error.message.includes("invalid-email")) {
          setErrorMessage(
            `${email} is not recognized as a valid email address`
          );
        }
        if (error.message.includes("weak-password")) {
          setErrorMessage("Password should be at least 6 characters");
        }
        if (error.message.includes("email-already-in-use")) {
          setErrorMessage(`${email} is already in use`);
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const a = getAuth();
        const user = a.currentUser;
        if (prof) {
          await updateProfile(user, { displayName: "professor" });
        } else {
          await updateProfile(user, { displayName: "student" });
        }
        router.push("/");
      } catch (error) {
        if (error.message.includes("invalid-email")) {
          setErrorMessage(
            `${email} is not recognized as a valid email address`
          );
        } else {
          setErrorMessage("Email address or password is incorrect");
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz Taker: Login</title>
      </Head>

      <main className={styles.login}>
        <h1>Login Page</h1>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div>
          <p>Email</p>
          <input
            type="text"
            size="45"
            value={email}
            placeholder="email address"
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            size="45"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
        </div>

        <p className={styles.login_boxes}>
          <input
            type="checkbox"
            value={newUser}
            onChange={() => setNewUser(!newUser)}
            className={styles.cbox}
          />{" "}
          New User
        </p>
        <p className={styles.login_boxes}>
          <input
            type="checkbox"
            value={prof}
            onChange={() => setProf(!prof)}
            className={styles.cbox}
          />{" "}
          Professor
        </p>
        <br />

        <div>
          <AwesomeButton
            type="secondary"
            disabled={email === "" || password === ""}
            onReleased={() => handleLogin()}
          >
            {newUser ? "Register" : "Log in"}
          </AwesomeButton>
        </div>
      </main>
    </div>
  );
}
