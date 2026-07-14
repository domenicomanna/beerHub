import { FC } from 'react';
import SearchBar from './searchBar/searchBar';

type Props = {
  beerName?: string;
  onBeerNameChange: (beerName: string) => void;
  showOnlyFavorites: boolean;
  toggleShowOnlyFavorites: () => void;
};

const Filters: FC<Props> = ({ beerName, onBeerNameChange, showOnlyFavorites, toggleShowOnlyFavorites }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '.5rem',
        marginBottom: '2rem',
      }}
    >
      <div style={{ flex: 1, maxWidth: '70%' }}>
        <SearchBar value={beerName ?? ''} onInputChange={(value) => onBeerNameChange(value)} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.35rem',
        }}
      >
        <input
          type="checkbox"
          id="favoritesOnly"
          checked={showOnlyFavorites}
          onChange={toggleShowOnlyFavorites}
          style={{
            width: '18px',
            height: '18px',
            cursor: 'pointer',
          }}
        />
        <label htmlFor="favoritesOnly" style={{ fontSize: '18px', cursor: 'pointer' }}>
          {' '}
          Favorites Only
        </label>
      </div>
    </div>
  );
};

export default Filters;
