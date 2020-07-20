import React, { useState, useEffect } from 'react'
import { useCountryTotal, useCountryHistorical } from 'src/hooks/stats';
import CountryTitle from 'src/components/CountryTitle';
import Loadable from 'react-loadable';
import Stats from 'src/components/Stats'
import { Row } from 'reactstrap';
import { isMobileOnly } from 'react-device-detect';
import { useQuery, queryCache } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal, fetchCountryHistorical, fetchAllCountries } from 'src/lib/api';
import styled from 'styled-components';
import SEO from 'src/components/seo';
import { useWindowSize } from 'src/hooks/useWindowSize';
import RegionsTable from './components/RegionsTable';
import { useTranslation } from 'react-i18next';

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
  const { data: fetchedTotalYesterday } = useCountryTotal({countryName: 'Uzbekistan', yesterday: true})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: 'Uzbekistan'})
  const { t } = useTranslation()
  const size = useWindowSize();
  useEffect(() => {
    queryCache.prefetchQuery([queryKeys.ALL_COUNTRIES], fetchAllCountries);
  }, [])
  return (
    <Styles>
      <SEO title="O'zbekiston koronavirus statistikasi" />
      <CountryTitle country={fetchedTotal || mockData} />
      <Stats data={fetchedTotal}  yesterday={fetchedTotalYesterday} />
      <section>
        <h3>{t("Daily Increase")}</h3>
        <DailyCasesChart limit={isMobileOnly ? 7 : 30} data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </section>
      <section>
        <h3>{t("General Increase")}</h3>
        <TotalCasesChart data={fetchedHistorical?.timeline} total={fetchedTotal} />
      </section>
      <section>
        <h3>{t("Among Regions")}</h3>
        <RegionsTable />
      </section>
    </Styles>
  )
}

export default Uzbekistan


const Styles = styled.div`
  overflow-y: hidden;
`;

