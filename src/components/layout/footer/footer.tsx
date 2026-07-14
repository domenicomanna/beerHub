import styles from './footer.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {new Date().getFullYear()}, BeerHub</p>
    </footer>
  );
};

export default Footer;
