import { useInfiniteQuery } from '@tanstack/react-query';
import { punkBeerApiClient } from '../../../apis/punkBeerApiClient/punkBeerApiClient';

const defaultLimit = 30;

export const useGetBeers = (args: { beerName?: string; favoritedBeerIds?: number[]; showOnlyFavorites: boolean }) => {
  return useInfiniteQuery({
    queryKey: ['beers', args.beerName, args],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < defaultLimit) return null;
      const nextPage = allPages.flat().length / defaultLimit + 1;
      return nextPage;
    },
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      if (args.showOnlyFavorites && (args.favoritedBeerIds ?? []).length === 0) return [];

      const beers = await punkBeerApiClient.getBeers({
        pageNumber: pageParam,
        limit: defaultLimit,
        beerName: args.beerName,
        beerIds: args.favoritedBeerIds,
      });

      return beers;
    },
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: 'Beers could not be loaded',
    },
  });
};
