import React from 'react';
import styles from './BeerHighlightList.module.css';
import BeerHighlight from '../BeerHighlight/BeerHighlight';
import Wrapper from '../Wrapper/Wrapper';
import { baseApiUrl } from '../../punkBeerClient';

const BeerHighlightList = (props) => {

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
        <BeerHighlight
            key={beer.id}
            id={beer.id}
            name={beer.name}
            description={shortenDescription(beer.description, 25)}
            image={`${baseApiUrl}/images/${beer.image}`}
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

    // if the last word in the array is a punctuation mark, remove it
    if (/[.,?/-]/.test(stringToShorten[stringToShorten.length - 1])) stringToShorten.pop();

    return stringToShorten.join(" ") + "...";
}
export default BeerHighlightList;