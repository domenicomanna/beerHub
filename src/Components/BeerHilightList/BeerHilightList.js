import React from 'react';
import styles from './BeerHilightList.module.css';
import BeerHilight from '../BeerHilight/BeerHilight';
import Wrapper from '../Wrapper/Wrapper';

const BeerHilightList = () => {
    return (
        <Wrapper>
            <div className={styles.beerList}>
                <BeerHilight beerName='Thunder' beerDescription='Best  beer ever beer ever beer ever beer ever beer ever'
                    imageUrl="https://images.punkapi.com/v2/192.png" />
                <BeerHilight beerName='Thunder' beerDescription='Best beer ever'
                    imageUrl="https://images.punkapi.com/v2/192.png" />
                <BeerHilight beerName='Thunder' beerDescription='Best beer ever'
                    imageUrl="https://images.punkapi.com/v2/192.png" />
            </div>
        </Wrapper>
    );
}

export default BeerHilightList;