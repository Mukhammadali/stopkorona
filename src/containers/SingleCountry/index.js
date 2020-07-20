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
import Layout from 'src/components/Layout';
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

const SingleCountry = ({ country, location }) => {
  const passedCountry = location?.state?.country;
  const { data: fetchedTotal } = useCountryTotal({countryName: country, initialData: passedCountry})
  const { data: fetchedHistorical } = useCountryHistorical({countryName: country})
  const { data: fetchedTotalYesterday } = useCountryTotal({countryName: country, yesterday: true})
  const {i18n, t} = useTranslation();
  const isLocaleUzbek = i18n.language === 'uz';
  console.log('isLocaleUzbek:', isLocaleUzbek)
  const countryName = isLocaleUzbek ? getCountryUzbekName(fetchedTotal?.countryInfo?.iso2)  : (fetchedTotal?.country || country);
  console.log('fetchedTotal:', fetchedTotal)

  return (
    <Layout>
      <Styles>
        <SEO title={`${countryName} statistikasi`} description={`${countryName} koronavirus statistikasi`} />
        <CountryTitle goBack country={fetchedTotal} />
        <Stats data={fetchedTotal} yesterday={fetchedTotalYesterday} />
        <div>
          <h3>{t("Daily Increase")}</h3>
          <DailyCasesChart limit={isMobileOnly ? 7 : 20} data={fetchedHistorical?.timeline} total={fetchedTotal} />
        </div>
        <div>
          <h3>{t("General Increase")}</h3>
          <TotalCasesChart data={fetchedHistorical?.timeline} total={fetchedTotal} />
        </div>
      </Styles>
    </Layout>
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