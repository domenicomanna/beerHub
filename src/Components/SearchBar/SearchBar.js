import React from 'react';
import Wrapper from '../Wrapper/Wrapper';
import styles from './SearchBar.module.css';
const SearchBar = () => {
    return (
        <Wrapper>
            <div className={styles.inputWrapper}>
                <input className={styles.beerInput} placeholder="Search for beer"></input>
            </div>
        </Wrapper>
    );
}

export default SearchBar;