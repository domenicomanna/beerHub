import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Containers/Layout/Layout';
import BeerContainer from './Containers/BeerContainer/BeerContainer';
import FavoritesContainer from './Containers/FavoritesContainer/FavoritesContainer';
import FullBeerContainer from './Containers/FullBeerContainer/FullBeerContainer';
import Message from './Components/Message/Message';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={BeerContainer} />
                <Route path="/favorites" component={FavoritesContainer} />
                <Route path="/beers/:beerId" component={FullBeerContainer} />
                <Route render = { () => <Message>Oh no! That page was not found.</Message>}/>
            </Switch>
        </Layout>
    );
}

export default App;
