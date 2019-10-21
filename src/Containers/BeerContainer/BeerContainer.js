import React, { Component} from 'react';
import debounce from 'lodash.debounce';
import clonedeep from 'lodash.clonedeep';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';
import Loader from '../../Components/Loader/Loader';
import Message from '../../Components/Message/Message';
import PunkBeerClient from '../../punkBeerClient';
import BeerStorage from '../../beerStorage';


class BeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();
    beerStorage = new BeerStorage();

    state = {
        hasError: false,
        hasMoreBeers: true,
        beerNameToSearch: '',
        isLoading: false,
        nextPageToQuery: 1,
        beers: [],
        favoritedBeers: this.beerStorage.getFavorites()
    }

    constructor(props) {
        super(props)
        this.loadBeersByName = debounce(this.loadBeersByName, 500);

        // Creates a reference to the function to call on scroll. The same reference
        // will be used when adding the scroll listener (here) and when removing it (in componentWillUnmount).
        // This ensures that the event listener is actually removed.
        this.debouncedScrollListener = debounce(this.handleBottomOfPageScroll, 100)
        window.addEventListener("scroll", this.debouncedScrollListener);
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

        // Creates a new request while aborting the previous pending api request (if there is any). 
        // Without aborting it, it is possible that unexpected data will be loaded. Aborting the previous request
        // ensures that the resulting data will only come from the next request
        this.punkBeerClient.createNewBeerRequest();
        
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
            if (error.name === 'AbortError') return;
            this.setErrorState();
        }
    }

    handleBeerNameChange = (event) => {
        // Reset the state every time the input changes
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
            if (error.name === 'AbortError') return;
            this.setErrorState();
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
            return {
                beers: [...currentState.beers, ...beers],
                isLoading: false,
                hasError: false
            };
        })
    }

    setErrorState = () => {
        this.setState({
            hasError: true,
            isLoading: false
        });
    }

    handleToggleFavorite = (beerIndex, event) => {
        event.stopPropagation();

        let beer = clonedeep(this.state.beers[beerIndex]);
        let favoritedBeers = clonedeep(this.state.favoritedBeers);
        let originalBeers = clonedeep(this.state.beers);

        beer.isFavorited = !beer.isFavorited;

        if (beer.isFavorited) favoritedBeers.set(beer.id, beer);
        else favoritedBeers.delete(beer.id);

        originalBeers[beerIndex] = beer;

        this.setState({
            beers: originalBeers,
            favoritedBeers: favoritedBeers
        })

        this.beerStorage.setFavorites(favoritedBeers);
    }

    handleBeerClick = (beerIndex) => {
        let beer = this.state.beers[beerIndex];
        this.props.history.push(`beers/${beer.id}`);
    }

    componentWillUnmount() {

        // Abort any pending api requests
        this.punkBeerClient.abortPreviousRequest();
        window.removeEventListener('scroll', this.debouncedScrollListener);
    }

    render() {
        const { isLoading, hasError } = this.state;
        
        const loader = isLoading ? <Loader /> : null;

        let beerContent = (
            <>
                <BeerHilightList beers={this.state.beers}
                    toggleFavorite={this.handleToggleFavorite}
                    allowFavoriteFunctionality={true}
                    handleBeerClick={this.handleBeerClick} />
            </>
        );

        if (hasError && !isLoading) beerContent = (
            <Message> There was an error processing your request.
            Please try again later </Message>
        );

        if (this.state.beers.length === 0 && !isLoading) beerContent = (
          <Message> No beers found :( </Message>
        )

        return (
            <Wrapper>
                <SearchBar handleInputChange={this.handleBeerNameChange} />
                {beerContent}
                {loader}
            </Wrapper>
        );
    }
}

export default BeerContainer;