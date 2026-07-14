import { FC } from 'react';
import styles from './beerHighlight.module.css';
import { BeerInfo } from '../../../../apis/punkBeerApiClient/types';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../constants/routePaths';
import { IoMdStar } from 'react-icons/io';
import { IoMdStarOutline } from 'react-icons/io';

type Props = {
  beer: BeerInfo;
  isFavorited: boolean;
  toggleFavoritedStatus: (beer: BeerInfo) => void;
};

const BeerHighlight: FC<Props> = ({ beer, isFavorited, toggleFavoritedStatus }) => {
  const iconSize = 34;

  return (
    <Link className={styles.beerHighlight} to={routePaths.beerDetails.to(beer.id)}>
      <div className={styles.favoriteWrapper}>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavoritedStatus(beer);
          }}
          className={styles.button}
        >
          {isFavorited ? (
            <IoMdStar size={iconSize} className={styles.favoriteIcon} />
          ) : (
            <IoMdStarOutline size={iconSize} className={styles.favoriteIcon} />
          )}
        </button>
      </div>

      <div className={styles.beer}>
        <img className={styles.beerImage} alt={`Beer: ${beer.name}`} src={beer.imageUrl} />

        <div className={styles.beerHighlightDetails}>
          <p className={styles.beerName}>{beer.name}</p>
          <p className={styles.beerDescription}>{shortenText(beer.description, 25)}</p>
        </div>
      </div>
    </Link>
  );
};

const shortenText = (text: string, maxNumberOfWords: number) => {
  const words = text.split(' ');
  if (words.length < maxNumberOfWords) return words.join(' ');

  const truncatedText = words
    .slice(0, maxNumberOfWords)
    .join(' ')
    // remove punctuation marks from the end of the string
    .replace(/[.,?/-]+$/, '');
  return `${truncatedText}...`;
};

export default BeerHighlight;
