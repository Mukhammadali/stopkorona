import React from 'react'
import Stats from './Stats'
import Charts from './Charts'
import CountriesTable from './CountriesTable'
// import HistoryBarChart3 from '';
import Loadable from 'react-loadable';
// import Loading from './my-loading-component';

const HistoryBarChart3 = Loadable({
  loader: () => import('src/components/HistoryBarChart3'),
  loading:  () => <div>Loading...</div>,
});

const Home = () => (
    <div>
        <Stats />
        <Charts />
        <HistoryBarChart3 />
        <CountriesTable />
    </div>
);


export default Home;
