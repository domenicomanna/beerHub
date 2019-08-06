import React from 'react';
import styles from './Message.module.css';

const ErrorMessage = (props) => {
    return (  
        <p className = {styles.message}>{props.children}</p>
    );
}
 
export default ErrorMessage;