import React from 'react';
import BeerHilightList from './Components/BeerHilightList/BeerHilightList';
import SearchBar from './Components/SearchBar/SearchBar';
import Layout from './Components/Layout/Layout';

function App() {
    return (
        <Layout>
            <SearchBar/>
            <BeerHilightList />
        </Layout>
    );
}

export default App;
