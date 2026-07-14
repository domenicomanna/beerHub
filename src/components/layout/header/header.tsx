import { NavLink } from 'react-router-dom';
import Container from '../../container/container';
import { routePaths } from '../../../constants/routePaths';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.navigation}>
          <h2 className={styles.company}>BeerHub</h2>
          <nav>
            <ul className={styles.navigationList}>
              <li>
                <NavLink className={styles.link} to={routePaths.beers}>
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
