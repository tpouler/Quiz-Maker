import Head from "next/head";

import styles from "../styles/index.module.css";

import Topics from "./topics";

import PropTypes from "prop-types";
//Testing

export default function ChooseTopic({ course, setTopics, setTopicsChosen }) {
  //console.log(`boolean of answer submitted is: ${submitted}`);

  return (
    <div className={styles.header}>
      <Head>
        <title>Potoo project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Please select which topics you want to be on the quiz!</h1>
      <center>
        <Topics
          course={course}
          setTopics={setTopics}
          setTopicsChosen={setTopicsChosen}
        />
      </center>
    </div>
  );
}

ChooseTopic.propTypes = {
  course: PropTypes.string,
  setTopicsChosen: PropTypes.func,
  setTopics: PropTypes.func,
};
