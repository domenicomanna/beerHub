import React from 'react';
import styles from './FullBeer.module.css';

const FullBeer = (props) => {
    return (
        <>
            <div className={styles.fullBeer}>

                <h2 className={styles.beerName}>{props.name}</h2>

                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={props.imageUrl} alt = "A beer"></img>
                </div>

                <div className={styles.description}>
                    <span className={styles.label}>Description:</span>
                    <p>{props.description}</p>
                </div>

                <div className={styles.foodPairings}>
                    <span className={styles.label}>Food Pairings: </span>
                    <ul>
                        {getFoodPairings(props.foodPairings)}
                    </ul>
                </div>

                <div className={styles.brewerTips}>
                    <span className={styles.label}> Brewer Tips: </span>
                    <p>{props.brewerTips}</p>
                </div>

            </div>
        </>
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
