import React from 'react';
import styles from './FullBeer.module.css';
import Wrapper from '../Wrapper/Wrapper';

const FullBeer = (props) => {
    return (
        <Wrapper>
            <div className={styles.fullBeer}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={props.imageUrl}></img>
                </div>
                <div className={styles.beerDetails}>
                    <h2 className={styles.beerName}>{props.name}</h2>

                    <span className={styles.label}>Description:</span>
                    <p className={styles.description}>{props.description}</p>

                    <span className={styles.label}>Food Pairings: </span>
                    <ul className={styles.foodPairings}>
                        {getFoodPairings(props.foodPairings)}
                    </ul>

                    <span className={styles.label}> Brewer Tips: </span>
                    <p className={styles.brewerTips}>{props.brewerTips}</p>
                </div>
            </div>
        </Wrapper>
    );
}

function getFoodPairings(foodPairings) {
    return foodPairings.map((foodPairing, index) => (
        <li key={index}>
            {foodPairing}
        </li>
    ))
}


export default FullBeer;
