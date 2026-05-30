import React, { Component } from 'react';
import BeerHighlightList from '../../Components/BeerHighlightList/BeerHighlightList';
import BeerStorage from '../../beerStorage';
import Wrapper from '../../Components/Wrapper/Wrapper';
import Message from '../../Components/Message/Message';

class FavoritesContainer extends Component {
    beerStorage = new BeerStorage();

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
            <BeerHighlightList beers={favoritedBeers}
                handleBeerClick={this.handleBeerClick} 
                allowFavoriteFunctionality = {false} 
                toggleFavorite = {this.toggleFavorite}/>
        );

        if (favoritedBeers.length === 0) contentToRender = (
            <Message> You currently have no favorited beers :( </Message>
        )

        return (
            <Wrapper>
                {contentToRender}
            </Wrapper>
        );
    }
}

export default FavoritesContainer;