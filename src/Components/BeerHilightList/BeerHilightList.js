import React from 'react';
import styles from './BeerHilightList.module.css';
import BeerHilight from '../BeerHilight/BeerHilight';
import Wrapper from '../Wrapper/Wrapper';

const BeerHilightList = (props) => {

    return (
        <Wrapper>
            <div className={styles.beerList}>
                {transformBeers(props)}
            </div>
        </Wrapper>
    );
}

function transformBeers(props) {
    return props.beers.map((beer, index) => (
        <BeerHilight
            key={beer.id}
            id={beer.id}
            name={beer.name}
            description={shortenDescription(beer.description, 25)}
            image={beer.image_url}
            isFavorited={beer.isFavorited}
            toggleFavorite={ event => props.toggleFavorite(index, event)}
            handleBeerClick={() => props.handleBeerClick(index)}
            allowFavoriteFunctionality = {props.allowFavoriteFunctionality}
        />
    ));

}

function shortenDescription(string, maxLength) {
    let stringToShorten = string.split(" ");
    stringToShorten.length = stringToShorten.length < maxLength ? stringToShorten.length - 1 : maxLength;

    // if the last word in the array is a puncutation mark, remove it
    if (/[.,?/-]/.test(stringToShorten[stringToShorten.length - 1])) stringToShorten.pop();

    return stringToShorten.join(" ") + "...";
}
export default BeerHilightList;