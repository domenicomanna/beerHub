import React from 'react';
import Layout from './Components/Layout/Layout';
import BeerContainer from './Containers/BeerContainer/BeerContainer';
import FavoritesContainer from './Containers/FavoritesContainer/FavoritesContainer';

function App() {
    return (
        <Layout>
            <BeerContainer/>
            <FavoritesContainer/>
        </Layout>
    );
}

export default App;
