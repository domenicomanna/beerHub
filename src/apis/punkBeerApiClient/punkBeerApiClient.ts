import axios from 'axios';
import { BeerInfo } from './types';

export const baseApiUrl = 'https://punkapi-alxiw.amvera.io/v3';

export const punkBeerApiClient = {
  getBeers: async (args?: {
    pageNumber?: number;
    limit?: number;
    beerName?: string;
    beerIds?: number[];
  }): Promise<BeerInfo[]> => {
    const response = await axios.get(`${baseApiUrl}/beers`, {
      params: {
        page: args?.pageNumber ?? 1,
        per_page: args?.limit ?? 30,
        ...((args?.beerIds ?? []).length > 0 && { ids: args?.beerIds?.join(',') }),
        ...(args?.beerName && { beer_name: args.beerName }),
      },
    });

    const beers = response.data as Partial<BeerInfo[]>;

    return beers.map((beer) => ({
      ...beer,
      imageUrl: createImageUrl(beer?.image ?? ''),
    })) as BeerInfo[];
  },

  getBeer: async (beerId: number): Promise<BeerInfo> => {
    const response = await axios.get(`${baseApiUrl}/beers/${beerId}`);
    const beer = response.data as Partial<BeerInfo>;
    return {
      ...beer,
      imageUrl: createImageUrl(beer.image ?? ''),
    } as BeerInfo;
  },
};

const createImageUrl = (imageName: string) => `${baseApiUrl}/images/${imageName}`;
