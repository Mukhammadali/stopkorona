import React, { useState } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import CountryTitle from 'src/components/CountryTitle';
import Loader from 'react-loader-spinner';
import Loadable from 'react-loadable';
import Stats from '../Home/Stats'
import { Row } from 'reactstrap';
import { isMobileOnly } from 'react-device-detect';
import GenderPieChart from './components/GenderPieChart';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal, fetchCountryHistorical } from 'src/lib/api';

const Loading = () => (
  <div className="my-3 row justify-content-center align-items-center" style={{height: 450}}>
    <Loader type="TailSpin" color="#00BFFF" height={80} width={80}/>
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

const query = graphql`
  query MyQuery {
    total {
      active
      cases
      country
      countryInfo {
        iso2
        iso3
      }
      deaths
      tests
      recovered
      todayCases
      todayDeaths
      updated
    }
  }
`;

const Uzbekistan = ({ historical }) => {
  const {total} = useStaticQuery(query)
  const { data: fetchedTotal } = useQuery(!total && [queryKeys.TOTAL_COUNTRY, { countryName: 'Uzbekistan' }], fetchCountryTotal)
  const { data: fetchedHistorical } = useQuery(!historical && [queryKeys.COUNTRY_HISTORICAL, { countryName: 'Uzbekistan' }], fetchCountryHistorical)
  const data = total || fetchedTotal;
  const historicalData = historical || fetchedHistorical
  return (
    <div>
      <CountryTitle country={data || mockData} />
      <Stats data={data} />
      <div>
        {isMobileOnly ? (
          <h3>Oxirgi 10 kunlik o'sish</h3>
        ):(
          <h3>Kunlik o'sish</h3>
        )}
        <DailyCasesChart data={historicalData?.timeline} total={data} />
      </div>
      <div>
        <h3>Umumiy o'sish</h3>
        <TotalCasesChart data={historicalData?.timeline} total={data} />
      </div>
      {/* <GenderPieChart /> */}
    </div>
  )
}

export default Uzbekistan

