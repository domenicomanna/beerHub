import React, { Component, Fragment } from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import SearchBar from '../../Components/SearchBar/SearchBar';
import BeerHilightList from '../../Components/BeerHilightList/BeerHilightList';

import PunkBeerClient from '../../punkBeerClient';

class BeerContainer extends Component {

    punkBeerClient = new PunkBeerClient();

    state = {
        hasError: false,
        hasMoreBeers: true,
        loading: false,
        pageNumber: 1,
        beers: [],
    }

    componentDidMount(){
        this.handleBeerLoading();
    }

    async handleBeerLoading(){
        this.setState({loading: true});

        try{
            let beers = await this.punkBeerClient.getAllBeers(this.state.pageNumber);

            if (beers.length < 25) this.setState({hasMoreBeers: false});

            else this.setState(previousState => {
                return  {pageNumber : previousState.pageNumber + 1};
            })

            this.setState(previousState => {
                return {beers: [...previousState.beers, ...beers]};
            })
        }

        catch(error){
            this.setState({hasError: true});
        }
        
        finally{
            this.setState({loading: false});
        }
    }

    render() {
        let loader = this.state.loading ? <p>LOADING</p> : null;
        console.log(this.state);
        

        return (
            <Fragment>

                <Wrapper>
                    <SearchBar />
                </Wrapper>

                <Wrapper>
                    <BeerHilightList beers = {this.state.beers}/>
                </Wrapper>

                <Wrapper>
                    {loader}
                </Wrapper>
            </Fragment>
        );
    }
}

export default BeerContainer;