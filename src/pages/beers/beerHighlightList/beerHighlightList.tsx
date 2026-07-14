import { BeerInfo } from '../../../apis/punkBeerApiClient/types';
import styles from './BeerHighlightList.module.css';
import BeerHighlight from './beerHighlight/beerHighlight';
import { FC } from 'react';

type Props = {
  beers: BeerInfo[];
  favoritedBeerIds: Set<number>;
  toggleFavoritedStatus: (beer: BeerInfo) => void;
};

const BeerHighlightList: FC<Props> = ({ beers, favoritedBeerIds, toggleFavoritedStatus }) => {
  if (beers.length === 0) {
    return (
      <p
        style={{
          fontSize: '20px',
        }}
      >
        No beers found
      </p>
    );
  }

  return (
    <div className={styles.beerList}>
      {beers.map((beer) => (
        <BeerHighlight
          key={beer.id}
          beer={beer}
          isFavorited={favoritedBeerIds.has(beer.id)}
          toggleFavoritedStatus={toggleFavoritedStatus}
        />
      ))}
    </div>
  );
};

export default BeerHighlightList;
