import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './Containers/Layout/Layout';
import BeerContainer from './Containers/BeerContainer/BeerContainer';
import FavoritesContainer from './Containers/FavoritesContainer/FavoritesContainer';

function App() {
    return (
        <Layout>
            <Route path = "/" exact component = {BeerContainer}/>
            <Route path = "/favorites" component = {FavoritesContainer}/>
        </Layout>
    );
}

export default App;
