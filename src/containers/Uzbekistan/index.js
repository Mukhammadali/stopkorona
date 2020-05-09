import React, { useState, useEffect } from 'react'
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import CountryTitle from 'src/components/CountryTitle';
import Loadable from 'react-loadable';
import Stats from 'src/components/Stats'
import { Row } from 'reactstrap';
import { isMobileOnly } from 'react-device-detect';
import GenderPieChart from './components/GenderPieChart';
import { useQuery, queryCache } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal, fetchCountryHistorical, fetchAllCountries } from 'src/lib/api';
import styled from 'styled-components';
import SEO from 'src/components/seo';
import { useWindowSize } from 'src/hooks/useWindowSize';
import RegionsTable from './components/RegionsTable';

const Loading = () => (
  <div className="my-3 row justify-content-center align-items-center" style={{height: 450}}>
    <div className="spinner-border text-secondary" style={{height: '3rem', width: '3rem'}}  role="status" />
  </div>
)

const TotalCasesChart = Loadable({
  loader: () => import('src/components/charts/TotalCasesChart'),
  loading:  Loading,
});

const DailyCasesChart = Loadable({
  loader: () => import('src/components/charts/DailyIncreaseChart'),
  loading:  Loading,
});

const mockData = {
  "country": "Uzbekistan",
  "countryInfo": {
    "_id": 860,
    "iso2": "UZ",
    "iso3": "UZB",
    "lat": 41,
    "long": 64,
    "flag": "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/uz.png"
  }
}

const Uzbekistan = ({ historical }) => {
  const { data: fetchedTotal } = useCountryTotal({countryName: 'Uzbekistan'})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: 'Uzbekistan'})
  const size = useWindowSize();
  useEffect(() => {
    queryCache.prefetchQuery([queryKeys.ALL_COUNTRIES], fetchAllCountries);
  }, [])
  return (
    <Styles>
      <SEO title="O'zbekiston koronavirus statistikasi" />
      <CountryTitle country={fetchedTotal || mockData} />
      <Stats data={fetchedTotal} />
      <section>
        <h3>Kunlik o'sish</h3>
        <DailyCasesChart limit={isMobileOnly ? 10 : 30} data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </section>
      <section>
        <h3>Umumiy o'sish</h3>
        <TotalCasesChart data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </section>
      <section>
        <h3>Viloyatlar bo'yicha</h3>
        <RegionsTable />
      </section>
    </Styles>
  )
}

export default Uzbekistan


const Styles = styled.div`
  overflow-y: hidden;
`;

