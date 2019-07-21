import React from 'react';
import styles from './Navigation.module.css';
import Wrapper from '../Wrapper/Wrapper';
const Navigation = () => {
    return (
        <Wrapper>
            <header className={styles.header}>
                <h2 className={styles.company}> BeerHub</h2>
                <nav>
                    <ul className={styles.navigation}>
                        <li> <a className={styles.active}> Home </a> </li>
                        <li> <a className={styles.active}> Home </a> </li>
                    </ul>
                </nav>
            </header>
        </Wrapper>
    );
}

export default Navigation;