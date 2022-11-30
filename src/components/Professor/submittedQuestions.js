import PropTypes from "prop-types";
import styles from "../../styles/index.module.css";
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";

// submitted,
export default function SubmittedQuestions({ setSubmitted }) {
  // eslint-disable-line

  return (
    <div>
      <h2> Question Submitted </h2>
      <p>Would you like to add another question?</p>
      <AwesomeButton
        type="primary"
        onReleased={() => {
          setSubmitted(false);
        }}
      >
        Yes
      </AwesomeButton>
      <div className={styles.divider} />

      <AwesomeButton
        onReleased={() => {
          location.href = "/";
        }}
        type="danger"
      >
        No
      </AwesomeButton>
      {/* <button className = {styles.button} type= "submit" onClick={() =>{setSubmitted(false)}} value= "submit" > Yes </button>
        <button className = {styles.button} type= "return"  value= "return"> No </button> */}
    </div>
  );
}

SubmittedQuestions.propTypes = {
  submitted: PropTypes.bool,
  setSubmitted: PropTypes.func,
};
