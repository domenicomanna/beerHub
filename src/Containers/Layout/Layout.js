import React from 'react';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer'
import styles from './Layout.module.css';

const Layout = (props) => {
    return ( 
        <div className = {styles.pageContent}>
            <Navigation/>
            <main className = {styles.mainContent}>
                {props.children}
            </main>
            <Footer/>
        </div>
    );
}
    
export default Layout;
