/* eslint-disable  react/prop-types */
import "../styles/globals.css";
import { initializeFirebase } from "../utils/firebase-utils.mjs";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  return <Component {...pageProps} />;
}

export default MainApp;
