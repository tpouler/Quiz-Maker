/* eslint-disable  react/prop-types */
import "../styles/globals.css";

import "react-awesome-button/dist/styles.css";
import "../styles/awesome.css";

function MainApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MainApp;
