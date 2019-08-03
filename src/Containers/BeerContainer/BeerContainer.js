import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import clonedeep from 'lodash.clonedeep';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';
import Loader from '../../Components/Loader/Loader';
import styles from './BeerContainer.module.css';
import PunkBeerClient from '../../punkBeerClient';
import BeerStorage from '../../beerStorage';

class BeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();
    beerStorage = new BeerStorage();

    state = {
        hasError: true,
        hasMoreBeers: true,
        beerNameToSearch: '',
        isLoading: true,
        nextPageToQuery: 1,
        beers: [],
        favoritedBeers: this.beerStorage.getFavorites()
    }

    constructor(props) {
        super(props)
        this.loadBeersByName = debounce(this.loadBeersByName, 800);
        window.onscroll = debounce(this.handleBottomOfPageScroll, 100)
    }

    handleBottomOfPageScroll = () => {
        const { hasError, isLoading, hasMoreBeers } = this.state;

        if (hasError || isLoading || !hasMoreBeers) return;

        if (window.innerHeight + document.documentElement.scrollTop + 1000
            >= document.documentElement.offsetHeight) {
            this.determineWhichBeersToLoad();
        }
    }

    determineWhichBeersToLoad = () => {
        const { beerNameToSearch } = this.state;

        // if true, the search bar must be empty
        if (beerNameToSearch === '') {
            this.loadBeersFromCatalog();
            return;
        }

        this.loadBeersByName(beerNameToSearch);
    }

    componentDidMount() {
        this.loadBeersFromCatalog();
    }

    async loadBeersFromCatalog() {
        this.setState({ isLoading: true });

        try {
            let beers = await this.punkBeerClient.getAllBeers(this.state.nextPageToQuery);
            this.addFavoriteValueToBeers(beers);
            this.updateStateWithLoadedBeers(beers);
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    handleBeerNameChange = (event) => {
        // Reset the state 
        this.setState({
            beerNameToSearch: event.target.value,
            beers: [],
            nextPageToQuery: 1,
            isLoading: true
        }, this.determineWhichBeersToLoad);
    }

    async loadBeersByName(beerName) {
        try {
            let beers = await this.punkBeerClient.getBeersByName(beerName, this.state.nextPageToQuery);
            this.addFavoriteValueToBeers(beers);
            this.updateStateWithLoadedBeers(beers);
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    addFavoriteValueToBeers = (beers) => {
        beers.forEach(beer => {
            beer.isFavorited = this.state.favoritedBeers.has(beer.id) ? true : false
        })
    }

    updateStateWithLoadedBeers = (beers) => {
        if (beers.length < 25) this.setState({ hasMoreBeers: false });

        else this.setState(currentState => {
            return {
                nextPageToQuery: currentState.nextPageToQuery + 1,
                hasMoreBeers: true
            };
        })

        this.setState(currentState => {
            return { beers: [...currentState.beers, ...beers] };
        })
    }

    handleToggleFavorite = (index) => {
        let beer = clonedeep(this.state.beers[index]);
        let favoritedBeers = clonedeep(this.state.favoritedBeers);
        let originalBeers = clonedeep(this.state.beers);

        beer.isFavorited = beer.isFavorited === undefined ? true : !beer.isFavorited;

        if (beer.isFavorited) favoritedBeers.set(beer.id, beer);
        else favoritedBeers.delete(beer.id);

        originalBeers[index] = beer;

        this.setState({
            beers: originalBeers,
            favoritedBeers: favoritedBeers
        })

        this.beerStorage.setFavorites(favoritedBeers);
    }

    render() {
        const { isLoading, hasError } = this.state;

        const loader = isLoading ? <Loader /> : null;

        let beerContent = (
            <>
                <SearchBar handleInputChange={this.handleBeerNameChange} />
                <BeerHilightList beers={this.state.beers}
                    toggleFavorite={this.handleToggleFavorite} />
            </>
        );

        if (hasError) beerContent = (
            <p className = {styles.errorMessage}> There was an error processing your request. 
            Please try again later </p>
        );

        return (
            <Fragment>
                <Wrapper>
                    {beerContent}
                    {loader}
                </Wrapper>
            </Fragment>
        );
    }
}

export default BeerContainer;