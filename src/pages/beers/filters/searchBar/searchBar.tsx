import { FC } from 'react';
import styles from './searchBar.module.css';

type Props = {
  value: string;
  onInputChange: (value: string) => void;
};

const SearchBar: FC<Props> = ({ value, onInputChange }) => {
  return (
    <input
      value={value}
      className={styles.beerInput}
      onChange={(event) => onInputChange(event.target.value)}
      placeholder="Search for beer..."
    />
  );
};

export default SearchBar;
