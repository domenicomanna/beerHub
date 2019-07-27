import React from 'react';
import styles from './BeerHilight.module.css';

const BeerHilight = (props) => {
    // solid star color <i class="fas fa-star"></i>
    // outlined star color <i class="far fa-star"></i>
    // let buttonClasses = `fas fa-star ${styles.blue}`

    return (
        <div className={styles.beerHilight}>

            <div className={styles.favoriteWrapper}>
                <button className={styles.button}>
                    <i className={`far fa-star ${styles.favoriteIcon}`} />
                </button>
            </div>

            <div className={styles.beer}>
                <img className={styles.beerImage}
                    alt={`Beer: ${props.name}`} src={props.image} />

                <div className={styles.beerHilightDetails}>
                    <p className={styles.beerName}>{props.name}</p>
                    <p className={styles.beerDescription}>{props.description}</p>
                </div>
            </div>
            
        </div>
    );
}

export default BeerHilight;