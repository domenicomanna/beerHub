export const routePaths = {
  beers: '/',
  beerDetails: {
    template: '/beers/:id',
    to: (beerId: number) => `/beers/${beerId}`,
  },
  notFound: '/not-found',
};
