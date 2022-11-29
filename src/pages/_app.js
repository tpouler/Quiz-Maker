/* eslint-disable react/prop-types */

import { initializeFirebase } from "../utils/firebase-utils.mjs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import UserContext from "../contexts/UserContext.js";

import "../styles/globals.css";

import "react-awesome-button/dist/styles.css";
import "../styles/awesome.css";

function MainApp({ Component, pageProps }) {
  initializeFirebase();

  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser();
        router.push("/login");
      }
    });
  }, []); // eslint-disable-line

  console.log(Component);

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MainApp;
