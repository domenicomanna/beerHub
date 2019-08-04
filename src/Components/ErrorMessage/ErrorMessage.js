import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
    return (  
        <p className = {styles.errorMessage}>{props.children}</p>
    );
}
 
export default ErrorMessage;