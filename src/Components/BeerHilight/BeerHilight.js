import React from 'react';
import styles from './BeerHilight.module.css';

const BeerHilight = (props) => {

    // solid star color fill: <i class="fas fa-star"></i>
    // outlined star color: <i class="far fa-star"></i>
    let favoritedState = props.isFavorited ? "fas fa-star" : "far fa-star";

    let favoriteButtonStyles = {
        cursor: props.allowFavoriteFunctionality ? "pointer" : "auto"
    }

    return (
        <div className={styles.beerHilight} onClick={props.handleBeerClick}>
            <div className={styles.favoriteWrapper}>
                <button style={favoriteButtonStyles} onClick={props.toggleFavorite}
                    className={styles.button}>
                    <i className={`${favoritedState} ${styles.favoriteIcon}`} />
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