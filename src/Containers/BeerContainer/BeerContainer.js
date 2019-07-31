import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';
import Loader from '../../Components/Loader/Loader';

import PunkBeerClient from '../../punkBeerClient';

class BeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();

    state = {
        hasError: false,
        hasMoreBeers: true,
        beerNameToSearch: '',
        isLoading: true,
        nextPageToQuery: 1,
        beers: []
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
            this.updateStateWithNewBeers(beers);
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
            this.updateStateWithNewBeers(beers);
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    updateStateWithNewBeers = (beers) => {
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

    render() {
        let loader = this.state.isLoading ? <Loader/> : null;

        return (
            <Fragment>

                <Wrapper>
                    <SearchBar handleInputChange={this.handleBeerNameChange} />
                </Wrapper>

                <Wrapper>
                    <BeerHilightList beers={this.state.beers} />
                </Wrapper>

                <Wrapper>
                    {loader}
                </Wrapper>
            </Fragment>
        );
    }
}

export default BeerContainer;