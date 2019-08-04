let baseUrl = "https://api.punkapi.com/v2/beers";

class PunkBeerClient {
    // pageNumber -> The page number to pull beer information from 
    // note, the first page starts at 1 and the last page is 13 (inclusive)
    getAllBeers(pageNumber) {
        let fullUrl = `${baseUrl}?page=${pageNumber}`;
        return getBeerData(fullUrl);
    }

    // beerName -> The name of the beers to search for
    getBeersByName(beerName, pageNumber) {
        beerName = encodeURI(beerName);
        let fullUrl = `${baseUrl}?beer_name=${beerName}&page=${pageNumber}`;
        return getBeerData(fullUrl);
    }

    getBeerById(beerId) {
        let fullUrl = `${baseUrl}/${beerId}`;
        return getBeerData(fullUrl);
    }
}

async function getBeerData(url, abortController) {
    let response = await fetch(url, {signal: abortController});
    if (!response.ok) throw new Error("Url not found");
    let jsonResponse = await response.json();
    return jsonResponse;
}

export default PunkBeerClient;