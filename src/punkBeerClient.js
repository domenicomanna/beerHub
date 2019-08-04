const baseUrl = "https://api.punkapi.com/v2/beers";

class PunkBeerClient {
    _abortController = new AbortController();

    // pageNumber -> The page number to pull beer information from 
    // note, the first page starts at 1 and the last page is 13 (inclusive)
    getAllBeers(pageNumber) {
        let fullUrl = `${baseUrl}?page=${pageNumber}`;
        return getBeerData(fullUrl, this._abortController);
    }

    // beerName -> The name of the beers to search for
    getBeersByName(beerName, pageNumber) {
        beerName = encodeURI(beerName);
        let fullUrl = `${baseUrl}?beer_name=${beerName}&page=${pageNumber}`;
        return getBeerData(fullUrl, this._abortController);
    }

    getBeerById(beerId) {
        let fullUrl = `${baseUrl}/${beerId}`;
        return getBeerData(fullUrl, this._abortController);
    }

    // Aborts any unifinished api requests, ensuring that the next request is the
    // only one that is running.
    createNewBeerRequest(){
        this.abortPreviousRequest();
        this._abortController = new AbortController();
    }

    // Aborts the api request that is currently running. Note, before making another api request
    // createNewBeerRequest must be called after this method.
    abortPreviousRequest() {
        this._abortController.abort();
    }
}

async function getBeerData(url, abortController) {
    let response = await fetch(url, { signal: abortController.signal });
    if (!response.ok) throw new Error("Url not found");
    let jsonResponse = await response.json();
    return jsonResponse;
}

export default PunkBeerClient;