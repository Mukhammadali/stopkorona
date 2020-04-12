import React, { useState } from 'react'
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import CountryTitle from 'src/components/CountryTitle';
import Loader from 'react-loader-spinner';
import Loadable from 'react-loadable';
import Stats from '../Home/Stats'
import { Row } from 'reactstrap';
import { isMobileOnly } from 'react-device-detect';

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

const Uzbekistan = () => {
  const { data: total } = useCountryTotal({countryName: 'Uzbekistan'})
  const { data: historical } = useCountryHistorical({countryName: 'Uzbekistan'});

  return (
    <div>
      <CountryTitle country={total} />
      <Stats data={total || mockData} />
      <div>
        <h3>Umumiy</h3>
        <TotalCasesChart data={historical?.timeline} total={total} />
      </div>
      <div>
        {isMobileOnly ? (
          <h3>Oxirgi 10 kunlik o'sish</h3>
        ):(
          <h3>Kunlik o'sish</h3>
        )}
        <DailyCasesChart data={historical?.timeline} total={total} />
      </div>
    </div>
  )
}

export default Uzbekistan
