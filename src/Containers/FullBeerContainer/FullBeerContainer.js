import React, { Component } from 'react';
import FullBeer from '../../Components/FullBeer/FullBeer';
import PunkBeerClient from '../../punkBeerClient';
import Loader from '../../Components/Loader/Loader';
import Wrapper from '../../Components/Wrapper/Wrapper';
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage';

class FullBeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();

    state = {
        beer: null,
        isLoading: true,
        hasError: false
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        let beerId = this.props.match.params.beerId;

        try {
            let beers = await this.punkBeerClient.getBeerById(beerId);
            this.setState({ beer: beers[0] });
        }

        catch (error) {
            console.log(error);
            this.setState({ hasError: true });
        }

        finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { beer, hasError, isLoading } = this.state;

        let loader = isLoading ? <Loader /> : null
        
        let errorMessage = hasError ? 
            <ErrorMessage>Oh no! That beer was not found, Try another one!</ErrorMessage> : null

        let fullBeer = null;

        if (beer != null) {
            fullBeer = <FullBeer name={beer.name}
                imageUrl={beer.image_url} description={beer.description}
                brewerTips={beer.brewers_tips} foodPairings={beer.food_pairing} />
        }

        return (
            <Wrapper>
                {loader}
                {errorMessage}
                {fullBeer}
            </Wrapper>
        );
    }
}

export default FullBeerContainer;