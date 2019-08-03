import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import styles from './SearchBar.module.css';
const SearchBar = (props) => {
    return (
        <Wrapper>
            <div className={styles.inputWrapper}>
                <input className={styles.beerInput} onChange={props.handleInputChange}
                    placeholder="Search for beer..."></input>
            </div>
        </Wrapper>
    );
}

export default SearchBar;