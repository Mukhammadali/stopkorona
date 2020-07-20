import React, { memo } from 'react'
import Loadable from 'react-loadable';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchTotal, fetchAllHistorical, fetchAllCountries } from 'src/lib/api';
import Stats from 'src/components/Stats';
import { isMobileOnly } from 'react-device-detect';
import SEO from 'src/components/seo';
import Layout from 'src/components/Layout';
import { useTranslation } from 'react-i18next';
import WorldMap from 'src/components/WorldMap';

const Loading = () => (
  <div className="my-3 row justify-content-center align-items-center" style={{height: 450}}>
    <div className="spinner-border text-secondary" style={{height: '3rem', width: '3rem'}}  role="status" />
  </div>
)

const TotalCasesChart = Loadable({
  loader: () => import('src/components/charts/TotalCasesChart'),
  loading: Loading,
});

const DailyCasesChart = Loadable({
  loader: () => import('src/components/charts/DailyIncreaseChart'),
loading:  Loading,
});


const Global = () => {
  const { data: fetchedTotal } = useQuery([queryKeys.TOTAL], fetchTotal, {
    refetchOnMount: false
  })
  const { data: fetchedHistorical} = useQuery([queryKeys.ALL_HISTORICAL], fetchAllHistorical, {
    refetchOnMount: false
  })
  const { data: fetchedAllCountries} = useQuery([queryKeys.ALL_COUNTRIES], fetchAllCountries, {
    refetchOnMount: false
  })
  const {t} = useTranslation()
  return (
    <Layout>
      <SEO title="Dunyo koronavirus statistikasi" description="Butun Jahon koronavirus statistikasi"/>
      <Stats data={fetchedTotal} />
      {
        !isMobileOnly && (
          <div style={{height: 600}}>
            <WorldMap data={fetchedAllCountries}/>
          </div>
        )
      }
      <div>
          <h3>{t("Daily Increase")}</h3>
          <DailyCasesChart limit={isMobileOnly ? 7 : 20} data={fetchedHistorical} total={fetchedTotal} />
        </div>
        <div>
          <h3>{t("General Increase")}</h3>
          <TotalCasesChart data={fetchedHistorical} total={fetchedTotal} />
        </div>
        
    </Layout>
  );
}


export default memo(Global);
