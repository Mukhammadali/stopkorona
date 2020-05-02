import React, { memo } from 'react'
import styled from 'styled-components';
import Stats from 'src/components/Stats';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal } from 'src/lib/api';
import Loadable from "react-loadable";
import SEO from 'src/components/seo';
import CountryTitle from 'src/components/CountryTitle';
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import { isMobileOnly } from 'react-device-detect';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
import { useSelector } from 'react-redux';

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

const SingleCountry = ({ country, location }) => {
  const passedCountry = location?.state?.country;
  const { data: fetchedTotal } = useCountryTotal({countryName: country, initialData: passedCountry})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: country})
  const countryName = getCountryUzbekName(fetchedTotal?.countryInfo?.iso2)  || fetchedTotal?.country || country;
  return (
    <Styles>
      <SEO title={`${countryName} statistikasi`} description={`${countryName} koronavirus statistikasi`} />
      <CountryTitle goBack country={fetchedTotal} />
      <h1 className="red">Test</h1>
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
  .red {
    color: red;
  }
`;