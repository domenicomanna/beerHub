import React from 'react';
import Wrapper from '../../../Components/Wrapper/Wrapper';
import styles from './Footer.module.css';
const Footer = () => {
    return (
        <footer className = {styles.footer}>
            <Wrapper>
                <p>Copyright &copy; 2019, BeerHub. All Rights Reserved</p>
            </Wrapper>
        </footer>
    );
}

export default Footer;