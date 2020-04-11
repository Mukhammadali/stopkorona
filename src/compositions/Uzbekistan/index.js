import React, { useState } from 'react'
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import CountryTitle from 'src/components/CountryTitle';
// import TotalCasesChart from ''
import Loadable from 'react-loadable';
import Stats from '../Home/Stats'

const TotalCasesChart = Loadable({
  loader: () => import('src/components/charts/TotalCasesChart'),
  loading:  () => <div>Loading...</div>,
});

const Uzbekistan = () => {
  const { data: total } = useCountryTotal({countryName: 'Uzbekistan'})
  const { data: historical } = useCountryHistorical({countryName: 'Uzbekistan'});

  return (
    <div>
      <CountryTitle country={total} />
      <Stats data={total} />
      <TotalCasesChart data={historical?.timeline} total={total} />
    </div>
  )
}

export default Uzbekistan
