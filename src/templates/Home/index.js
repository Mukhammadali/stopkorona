import React, { memo } from 'react'
import Charts from './Charts'
import CountriesTable from './CountriesTable'
// import HistoryBarChart3 from '';
import Loadable from 'react-loadable';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchTotal, fetchAllHistorical } from 'src/lib/api';
import Stats from './Stats';
import { isMobileOnly } from 'react-device-detect';
import SEO from 'src/components/seo';
// import Loading from './my-loading-component';
const TotalCasesChart = Loadable({
  loader: () => import('src/components/charts/TotalCasesChart'),
  loading: () => <></>,
});

const DailyCasesChart = Loadable({
  loader: () => import('src/components/charts/DailyIncreaseChart'),
  loading:  () => <></>,
});

const HistoryBarChart3 = Loadable({
  loader: () => import('src/components/HistoryBarChart3'),
  loading:  () => <div>Loading...</div>,
});

const Home = () => {
  const { data: fetchedTotal } = useQuery([queryKeys.TOTAL], fetchTotal, {
    refetchOnMount: false
  })
  const { data: fetchedHistorical} = useQuery([queryKeys.ALL_HISTORICAL], fetchAllHistorical, {
    refetchOnMount: false
  })
  return (
    <div>
      <SEO title="Dunyo koronavirus statistikasi" description="Butun Jahon koronavirus statistikasi"/>
      <Stats data={fetchedTotal} />
        <div>
          {isMobileOnly ? (
            <h3>7 kunlik o'sish</h3>
          ):(
            <h3>20 kunlik o'sish</h3>
          )}
          <DailyCasesChart limit={isMobileOnly ? 7 : 20} data={fetchedHistorical} total={fetchedTotal} />
        </div>
        <div>
          <h3>Umumiy o'sish</h3>
          <TotalCasesChart data={fetchedHistorical} total={fetchedTotal} />
        </div>
      <CountriesTable />
    </div>
  );
}


export default memo(Home);
