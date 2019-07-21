import React from 'react';
import styles from './BeerHilightList.module.css';
import BeerHilight from '../BeerHilight/BeerHilight';

const BeerHilightList = () => {
    return (
        <div className={styles.beerList}>
            <BeerHilight beerName='Thunder' beerDescription='Best beer ever'
                imageUrl="https://images.punkapi.com/v2/192.png" />
            <BeerHilight beerName='Thunder' beerDescription='Best beer ever'
                imageUrl="https://images.punkapi.com/v2/192.png" />
            <BeerHilight beerName='Thunder' beerDescription='Best beer ever'
                imageUrl="https://images.punkapi.com/v2/192.png" />
        </div>
    );
}

export default BeerHilightList;