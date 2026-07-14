import { Navigate, useParams } from 'react-router-dom';
import { useGetBeerInfo } from './queries/useGetBeerInfo';
import { routePaths } from '../../constants/routePaths';
import Loader from '../../components/loader/loader';
import FullBeerDetails from './fullBeer/fullBeerDetails';

const BeerDetails = () => {
  const { id } = useParams();
  const beerInfoQuery = useGetBeerInfo(id ?? '');

  if (!beerInfoQuery.isPending && !beerInfoQuery.data) return <Navigate to={routePaths.notFound} replace />;

  if (beerInfoQuery.isPending) return <Loader />;

  const beerInfo = beerInfoQuery.data;

  return beerInfo && <FullBeerDetails beerInfo={beerInfo} />;
};

export default BeerDetails;
