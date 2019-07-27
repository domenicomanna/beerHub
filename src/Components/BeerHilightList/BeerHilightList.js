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
            description={beer.description}
            image={beer.image_url} />
    ));

}
export default BeerHilightList;