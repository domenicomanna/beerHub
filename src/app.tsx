import { Route, Routes } from 'react-router-dom';
import { routePaths } from './constants/routePaths';
import Layout from './components/layout/layout';
import NotFound from './pages/notFound';
import Beers from './pages/beers/beers';
import BeerDetails from './pages/beerDetails';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={routePaths.beers} element={<Beers />} />
        <Route path={routePaths.beerDetails.template} element={<BeerDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
