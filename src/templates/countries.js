import React, { memo } from 'react'
import SEO from 'src/components/seo';
import CountriesTable from 'src/components/CountriesTable';
import Layout from 'src/components/Layout';
import { Router } from '@reach/router';
import SingleCountry from 'src/containers/SingleCountry';
import { useTranslation } from 'react-i18next';

const Countries = () => {
  const { i18n } = useTranslation();
  const path = i18n.language === 'uz' ? 'countries' : `${i18n.language}/countries`
  return (
    <Layout>
      <SEO title="Davlatlar Koronavirus statistikasi" description="Butun dunyo davlatlarining koronavirus statistikasi jadvali"/>
      {/* <div style={{
        overflowX: 'hidden'
      }}> */}
        <Router>
          <SingleCountry  path={path + '/:country'} />
          <CountriesTable path={path} />
        </Router>
      {/* </div> */}
    </Layout>
  );
}


export default memo(Countries);
