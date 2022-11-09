

 

import PropTypes from "prop-types";

 

import styles from "../../styles/index.module.css";

import "react-awesome-button/dist/styles.css";

 

export default function SubmittedQuestions({submitted, setSubmitted}){ // eslint-disable-line

 

    return(

<div>

        <h2> Question Submitted </h2>

        <p>

          Would you like to add another question?

        </p>

        <button className = {styles.button} type= "submit" onClick={() =>{setSubmitted(false)}} value= "submit" > Yes </button>

        <button className = {styles.button} type= "return"  value= "return"> No </button>

 

        </div>

    );

};

 

SubmittedQuestions.propTypes = {

    submitted: PropTypes.bool,

    setSubmitted: PropTypes.func,

};