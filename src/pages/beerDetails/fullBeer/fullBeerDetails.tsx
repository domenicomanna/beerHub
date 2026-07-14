import { FC } from 'react';
import styles from './fullBeerDetails.module.css';
import { BeerInfo } from '../../../apis/punkBeerApiClient/types';

type Props = {
  beerInfo: BeerInfo;
};

const FullBeerDetails: FC<Props> = ({ beerInfo }) => {
  return (
    <div className={styles.fullBeer}>
      <h2 className={styles.beerName}>{beerInfo.name}</h2>

      <div className={styles.imageWrapper}>
        <img className={styles.image} src={beerInfo.imageUrl} alt={beerInfo.name}></img>
      </div>

      <div className={styles.description}>
        <span className={styles.label}>Description:</span>
        <p>{beerInfo.description}</p>
      </div>

      <div className={styles.foodPairings}>
        <span className={styles.label}>Food Pairings: </span>
        <ul>
          {beerInfo.food_pairing.map((foodPairing, index) => (
            <li key={index}>{foodPairing}</li>
          ))}
        </ul>
      </div>

      <div className={styles.brewerTips}>
        <span className={styles.label}> Brewer Tips: </span>
        <p>{beerInfo.brewers_tips}</p>
      </div>
    </div>
  );
};

export default FullBeerDetails;
