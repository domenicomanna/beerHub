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
        pageNumberToQuery: 1,
        beers: []
    }

    componentDidMount() {
        this.handleBeerCatalogLoading();
    }

    async handleBeerCatalogLoading() {
        this.setState({
            isLoading: true
        });

        try {
            let beers = await this.punkBeerClient.getAllBeers(this.state.pageNumberToQuery);

            if (beers.length < 25) this.setState({ hasMoreBeers: false });

            else this.setState(currentState => {
                return {
                    pageNumberToQuery: currentState.pageNumberToQuery + 1,
                    hasMoreBeers: true
                };
            })

            this.setState(currentState => {
                return { beers: [...currentState.beers, ...beers] };
            })
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
            pageNumberToQuery: 1,
            isLoading: true
        }, () => {
            if (beerName === '') {
                this.handleBeerCatalogLoading();
                return;
            }
            console.log(this.state);
            this.getBeersByName(beerName)
        })
    }

    async getBeersByName(beerName) {
        try {
            let beers = await this.punkBeerClient.getBeersByName(beerName, this.state.pageNumberToQuery);

            if (beers.length < 25) this.setState({ hasMoreBeers: false });

            else this.setState(currentState => {
                return {
                    pageNumberToQuery: currentState.pageNumberToQuery + 1,
                    hasMoreBeers: true
                };
            })

            this.setState(previousState => {
                return { beers: [...previousState.beers, ...beers] };
            })
        }

        catch (error) {
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
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