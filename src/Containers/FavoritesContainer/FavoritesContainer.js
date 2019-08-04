import React, { Component } from 'react';
import styles from './FavoritesContainer.module.css';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';
import BeerStoage from '../../beerStorage';
import Wrapper from '../../Components/Wrapper/Wrapper';

class FavoritesContainer extends Component {
    beerStorage = new BeerStoage();

    state = {
        favoritedBeers: this.beerStorage.getFavoritesAsArray()
    }

    handleBeerClick = (beerIndex) => {
        let beer = this.state.favoritedBeers[beerIndex];
        this.props.history.push(`beers/${beer.id}`);
    }

    toggleFavorite = (beerIndex, event) => {
        event.stopPropagation();
    }

    render() {
        const { favoritedBeers } = this.state;
        let contentToRender = (
            <BeerHilightList beers={favoritedBeers}
                handleBeerClick={this.handleBeerClick} 
                allowFavoriteFunctionality = {false} 
                toggleFavorite = {this.toggleFavorite}/>
        );

        if (favoritedBeers.length === 0) contentToRender = (
            <p className={styles.message}> You currently have no favorited beers :( </p>
        )

        return (
            <Wrapper>
                {contentToRender}
            </Wrapper>
        );
    }
}

export default FavoritesContainer;