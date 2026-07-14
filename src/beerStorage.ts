const _beersKey = 'favoritedBeers';

export const beerStorage = {
  toggleFavorite: (beerId: number): Set<number> => {
    const favoritedBeerIds = beerStorage.getFavoritedBeerIds();
    if (favoritedBeerIds.has(beerId)) favoritedBeerIds.delete(beerId);
    else favoritedBeerIds.add(beerId);
    localStorage.setItem(_beersKey, JSON.stringify([...favoritedBeerIds]));
    return favoritedBeerIds;
  },

  getFavoritedBeerIds: (): Set<number> => {
    const favorites = localStorage.getItem(_beersKey);
    const favoritesAsArray = favorites ? (JSON.parse(favorites) as number[]) : [];
    return new Set(favoritesAsArray);
  },
};
