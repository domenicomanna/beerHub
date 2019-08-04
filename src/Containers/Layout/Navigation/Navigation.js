import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Wrapper from '../../../Components/Wrapper/Wrapper';
const Navigation = () => {
    return (
        <header className={styles.header}>
            <Wrapper>
                <div className={styles.navigation}>
                    <h2 className={styles.company}> BeerHub</h2>
                    <nav>
                        <ul className={styles.navigationList}>
                            <li>
                                <NavLink className={styles.link}
                                    activeClassName={styles.active}
                                    to="/" exact>Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={styles.link}
                                    activeClassName={styles.active}
                                    to="/favorites">Favorites</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Wrapper>
        </header>
    );
}

export default Navigation;