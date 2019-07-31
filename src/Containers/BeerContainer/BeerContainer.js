import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';

import PunkBeerClient from '../../punkBeerClient';

class BeerContainer extends Component {

    constructor(props) {
        super(props)

        this.getBeersByName = debounce(this.getBeersByName, 800);

        window.onscroll = debounce(() => {
            const { hasError, isLoading, hasMoreBeers } = this.state;

            if (hasError || isLoading || !hasMoreBeers) return;

            if (window.innerHeight + document.documentElement.scrollTop + 1000
                >= document.documentElement.offsetHeight) {
                this.determineWhichBeersToLoad();
            }
        }, 100)
    }

    determineWhichBeersToLoad = () => {
        const { beerNameToSearch } = this.state;

        if (beerNameToSearch === '') {
            this.handleBeerCatalogLoading();
            return;
        }

        this.getBeersByName(beerNameToSearch);
    }

    punkBeerClient = new PunkBeerClient();

    state = {
        hasError: false,
        hasMoreBeers: true,
        beerNameToSearch: '',
        isLoading: false,
        nextPageToQuery: 1,
        beers: []
    }

    componentDidMount() {
        this.handleBeerCatalogLoading();
    }

    async handleBeerCatalogLoading() {
        this.setState({ isLoading: true });

        try {
            let beers = await this.punkBeerClient.getAllBeers(this.state.nextPageToQuery);
            this.updateStateFromBeerData(beers);
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    handleBeerNameSearch = (event) => {
        let beerName = event.target.value;

        this.setState({
            beerNameToSearch: event.target.value,
            beers: [],
            nextPageToQuery: 1,
            isLoading: true
        }, () => {
            if (beerName === '') {
                this.handleBeerCatalogLoading();
                return;
            }
            this.getBeersByName(beerName)
        })
    }

    async getBeersByName(beerName) {
        try {
            let beers = await this.punkBeerClient.getBeersByName(beerName, this.state.nextPageToQuery);
            this.updateStateFromBeerData(beers);
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    updateStateFromBeerData = (beers) => {
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
        let loader = this.state.isLoading ? <p>LOADING</p> : null;


        return (
            <Fragment>

                <Wrapper>
                    <SearchBar handleInputChange={this.handleBeerNameSearch} />
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