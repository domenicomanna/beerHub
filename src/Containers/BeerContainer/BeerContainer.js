import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';

import PunkBeerClient from '../../punkBeerClient';

class BeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();

    state = {
        hasError: false,
        hasMoreBeers: true,
        isLoading: false,
        pageNumber: 1,
        beersFromCatalog: [],
        beersSearchedByName: [],
    }

    componentDidMount() {
        this.handleBeerCatalogLoading();

        window.onscroll = debounce(() => {

            const {hasError, isLoading, hasMoreBeers} = this.state;

            if (hasError || isLoading || !hasMoreBeers) return;

            if (window.innerHeight + document.documentElement.scrollTop + 1000
                >= document.documentElement.offsetHeight) {
                this.handleBeerCatalogLoading();
            }
        }, 100)
    }

    async handleBeerCatalogLoading() {
        this.setState({
            isLoading: true,
            beersSearchedByName: []
        });

        try {
            let beers = await this.punkBeerClient.getAllBeers(this.state.pageNumber);

            if (beers.length < 25) this.setState({ hasMoreBeers: false });

            else this.setState(previousState => {
                return {
                    pageNumber: previousState.pageNumber + 1,
                    hasMoreBeers: true
                };
            })

            this.setState(previousState => {
                return { beersFromCatalog: [...previousState.beersFromCatalog, ...beers] };
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
                    <SearchBar />
                </Wrapper>

                <Wrapper>
                    <BeerHilightList beers={this.state.beersFromCatalog} />
                </Wrapper>

                <Wrapper>
                    {loader}
                </Wrapper>
            </Fragment>
        );
    }
}

export default BeerContainer;