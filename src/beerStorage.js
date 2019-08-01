const BEER_KEY = "beers";

export default class BeerStorage{

    setFavorites(beerFavorites){
        window.localStorage.setItem(BEER_KEY, JSON.stringify(beerFavorites));
    }

    // Returns an array of all the favorited beers
    getFavorites(){
        let beers = window.localStorage.getItem(BEER_KEY);
        return JSON.parse(beers);
    }

    // Returns a set containing the id's of the favorited beers
    getIdsOfFavoritedBeers(){
        let beerIds = new Set();
        let beers = window.localStorage.getItem(BEER_KEY);
        beers = JSON.parse(beers);

        beers.forEach(beer => beerIds.add(beer.id));
        return beerIds;
    }
}