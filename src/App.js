import React from 'react';
import BeerHilightList from './Components/BeerHilightList/BeerHilightList';
import SearchBar from './Components/SearchBar/SearchBar';
import Layout from './Components/Layout/Layout';

import FullBeer from './Components/FullBeer/FullBeer';

function App() {
    return (
        <Layout>
            {/* <SearchBar/>
            <BeerHilightList /> */}
            <FullBeer name = "Thunder"

            description = "A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer. A smoky hot beer."

            imageUrl = "https://images.punkapi.com/v2/192.png"

            foodPairings = {['Shrimp and avocado', 'Shrimp and avocado', 'Shrimp and avocado']}

            brewerTips = "Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to Dont forget to "/>
        </Layout>
    );
}

export default App;
