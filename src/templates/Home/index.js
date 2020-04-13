import React from 'react'
import Stats from './Stats'
import Charts from './Charts'
import CountriesTable from './CountriesTable'
// import HistoryBarChart3 from '';
import Loadable from 'react-loadable';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchTotal } from 'src/lib/api';
// import Loading from './my-loading-component';

const HistoryBarChart3 = Loadable({
  loader: () => import('src/components/HistoryBarChart3'),
  loading:  () => <div>Loading...</div>,
});

const Home = () => {
  const { data } = useQuery([queryKeys.TOTAL], fetchTotal)
  return (
    <div>
      <Stats data={data} />
      <Charts />
      <HistoryBarChart3 />
      <CountriesTable />
    </div>
  );
}


export default Home;
