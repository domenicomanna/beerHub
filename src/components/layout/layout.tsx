import Header from './header/header';
import Footer from './footer/footer';
import { Outlet } from 'react-router-dom';
import Container from '../container/container';
import styles from './layout.module.css';

const Layout = () => {
  return (
    <div className={styles.pageContent}>
      <Header />
      <main className={styles.mainContent}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
