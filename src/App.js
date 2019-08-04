import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Containers/Layout/Layout';
import BeerContainer from './Containers/BeerContainer/BeerContainer';
import FavoritesContainer from './Containers/FavoritesContainer/FavoritesContainer';
import FullBeerContainer from './Containers/FullBeerContainer/FullBeerContainer';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={BeerContainer} />
                <Route path="/favorites" component={FavoritesContainer} />
                <Route path="/beers/:beerId" component={FullBeerContainer} />
            </Switch>
        </Layout>
    );
}

export default App;
