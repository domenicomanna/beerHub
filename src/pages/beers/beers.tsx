import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import { useGetBeers } from './queries/useGetBeers';
import { beerStorage } from '../../beerStorage';
import { BeerInfo } from '../../apis/punkBeerApiClient/types';
import { useInView } from 'react-intersection-observer';
import Filters from './filters/filters';
import BeerHighlightList from './beerHighlightList/beerHighlightList';

const Beers = () => {
  const [favoritedBeerIds, setFavoritedBeerIds] = useState(beerStorage.getFavoritedBeerIds());
  const [beerNameInput, setBeerNameInput] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [debouncedBeerName, setDebouncedBeerName] = useState('');

  useEffect(() => {
    // debounce the beer name changes so that we don't make an api request on every keystroke
    const timer = setTimeout(() => {
      setDebouncedBeerName(beerNameInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [beerNameInput]);

  const {
    data: queryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetBeers({
    beerName: debouncedBeerName,
    favoritedBeerIds: showOnlyFavorites ? [...favoritedBeerIds] : [],
    showOnlyFavorites,
  });

  const { ref: endOfListRef } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    },
  });

  const toggleFavoritedStatus = (beer: BeerInfo) => {
    const newFavoritedBeerIds = beerStorage.toggleFavorite(beer.id);
    setFavoritedBeerIds(newFavoritedBeerIds);
  };

  const beers = queryData?.pages?.flat() ?? [];

  return (
    <>
      <Filters
        beerName={beerNameInput}
        onBeerNameChange={setBeerNameInput}
        showOnlyFavorites={showOnlyFavorites}
        toggleShowOnlyFavorites={() => setShowOnlyFavorites((value) => !value)}
      />
      {isPending ? (
        <Loader />
      ) : (
        <>
          <BeerHighlightList
            beers={beers}
            favoritedBeerIds={favoritedBeerIds}
            toggleFavoritedStatus={toggleFavoritedStatus}
          />
          <div ref={endOfListRef} />
          {isFetchingNextPage && <Loader />}
        </>
      )}
    </>
  );
};

export default Beers;
