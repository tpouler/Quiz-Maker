import PropTypes from "prop-types";
import styles from "../../styles/index.module.css";
import "react-awesome-button/dist/styles.css";
import { AwesomeButton } from "react-awesome-button";

// submitted,
export default function SubmittedQuestions({ setSubmitted, edit }) {
  // eslint-disable-line

  return (
    <div>
      {!edit && <h2> Question Submitted </h2>}
      {edit && <h2> Question Edited </h2>}
      {!edit && <p>Would you like to add another question?</p>}
      {edit && <p>Would you like to edit another question?</p>}
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
    </div>
  );
}

SubmittedQuestions.propTypes = {
  edit: PropTypes.bool,
  setSubmitted: PropTypes.func,
};
