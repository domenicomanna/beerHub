const BEER_KEY = "beers";

export default class BeerStorage{

    setFavorites(beerFavorites){
        let beersAsArray = [];
        for (const value of beerFavorites.values()){
            beersAsArray.push(value);
        }
        window.localStorage.setItem(BEER_KEY, JSON.stringify(beersAsArray));
    }

    // Returns a map of the all the favorited beers. The key is the beer id
    // and the value is the beer. If no beers are favorited, an empty map will be returned
    getFavorites(){
        let beers = window.localStorage.getItem(BEER_KEY);
        if (!beers) return new Map();
        
        beers = JSON.parse(beers);
        let mappedBeers = new Map();

        beers.forEach(beer => {
            mappedBeers.set(beer.id, beer);
        })

        return mappedBeers;
        
    }
}