import { useQuery } from '@tanstack/react-query';
import { punkBeerApiClient } from '../../../apis/punkBeerApiClient/punkBeerApiClient';
import { BeerInfo } from '../../../apis/punkBeerApiClient/types';

export const useGetBeerInfo = (beerId: string) => {
  return useQuery({
    queryKey: ['beer', beerId],
    queryFn: async (): Promise<BeerInfo | null> => {
      if (!beerId) return null;
      const beer = await punkBeerApiClient.getBeer(parseInt(beerId, 10));
      return beer;
    },
    meta: {
      errorMessage: 'Beer could not be loaded',
    },
  });
};
