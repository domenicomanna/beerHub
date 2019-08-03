import React, {Component} from 'react';
import styles from './FavoritesContainer.module.css';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';
import BeerStoage from '../../beerStorage';
import Wrapper from '../../Components/Wrapper/Wrapper';

class FavoritesContainer extends Component {
    beerStorage = new BeerStoage();

    state = {  
        favoritedBeers: this.beerStorage.getFavoritesAsArray()
    }

    render() { 
        const {favoritedBeers} = this.state;    
        let contentToRender = (
            <BeerHilightList beers= {favoritedBeers} />
        );

        if (favoritedBeers.length === 0) contentToRender = (
            <p className = {styles.message}> You currently have no favorited beers :( </p>
        )

        return (  
            <Wrapper>
                {contentToRender}
            </Wrapper>
        );
    }
}
 
export default FavoritesContainer;