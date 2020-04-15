import React, { memo } from 'react'
import styled from 'styled-components';
import Stats from '../Home/Stats';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal } from 'src/lib/api';
import Loadable from "react-loadable";
import Loader from 'react-loader-spinner';
import SEO from 'src/components/seo';
import CountryTitle from 'src/components/CountryTitle';
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import { isMobileOnly } from 'react-device-detect';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
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

const SingleCountry = ({ country, location }) => {
  const passedCountry = location?.state?.country;
  const { data: fetchedTotal } = useCountryTotal({countryName: passedCountry?.country, initialData: passedCountry})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: passedCountry?.country})
  const countryName = getCountryUzbekName(passedCountry?.countryInfo?.iso2)  || passedCountry?.country;
  return (
    <Styles>
      <SEO title={`${countryName} statistikasi`} description={`${countryName} koronavirus statistikasi`} />
      <CountryTitle country={fetchedTotal} />
      <Stats data={fetchedTotal} />
      <div>
        {isMobileOnly ? (
          <h3>7 kunlik o'sish</h3>
        ):(
          <h3>20 Kunlik o'sish</h3>
        )}
        <DailyCasesChart limit={isMobileOnly ? 7 : 20} data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </div>
      <div>
        <h3>Umumiy o'sish</h3>
        <TotalCasesChart data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </div>
    </Styles>
  )
}

export default memo(SingleCountry)


const Styles = styled.div`
  .country-flag {
    height: 30px;
    width: 50px;
  }
`;