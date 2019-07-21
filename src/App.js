import React from 'react';
import BeerHilight from './Components/BeerHilight/BeerHilight';

function App() {
  return (
    <div className="App">
        <BeerHilight beerName = 'Thunder' beerDescription = 'Best beer ever'
        imageUrl = "https://images.punkapi.com/v2/192.png"/>
    </div>
  );
}

export default App;
