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

const Uzbekistan = ({ historical }) => {
  const { data: fetchedTotal } = useCountryTotal({countryName: 'Uzbekistan'})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: 'Uzbekistan'})
  return (
    <div>
      <CountryTitle country={fetchedTotal || mockData} />
      <Stats data={fetchedTotal} />
      <div>
        {isMobileOnly ? (
          <h3>7 kunlik o'sish</h3>
        ):(
          <h3>Kunlik o'sish</h3>
        )}
        <DailyCasesChart limit={isMobileOnly ? 7 : null} data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </div>
      <div>
        <h3>Umumiy o'sish</h3>
        <TotalCasesChart data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </div>
      {/* <GenderPieChart /> */}
    </div>
  )
}

export default Uzbekistan

