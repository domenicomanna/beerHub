import React, {Fragment} from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

const Layout = (props) => {
    return ( 
        <Fragment>
            <Navigation/>
            <main className = {styles.mainContent}>
                {props.children}
            </main>
        </Fragment>
    );
}
    
export default Layout;
