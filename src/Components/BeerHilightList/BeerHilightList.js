import React from 'react';
import styles from './BeerHilightList.module.css';
import BeerHilight from '../BeerHilight/BeerHilight';
import Wrapper from '../Wrapper/Wrapper';

const BeerHilightList = (props) => {

    return (
        <Wrapper>
            <div className={styles.beerList}>
                {transformBeers(props.beers)}
            </div>
        </Wrapper>
    );
}

function transformBeers(beers) {
    return beers.map(beer => (
        <BeerHilight
            key={beer.id}
            name={beer.name}
            description={shortenLength(beer.description, 25)}
            image={beer.image_url} />
    ));

}


function shortenLength(string, maxLength){
    let shortenedString = string.split(" ");
    shortenedString.length = shortenedString.length < maxLength ? shortenedString.length - 1 : maxLength;

    // if the last word in the array is a puncutation mark, remove it
    if (/[.,?/-]/.test(shortenedString[shortenedString.length - 1])) shortenedString.pop();
    
    return shortenedString.join(" ") + "...";
}
export default BeerHilightList;