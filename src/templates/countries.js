import React, { memo } from 'react'
import SEO from 'src/components/seo';
import CountriesTable from 'src/components/CountriesTable';
import Layout from 'src/components/Layout';
import { Router } from '@reach/router';
import SingleCountry from 'src/containers/SingleCountry';
import { useTranslation } from 'react-i18next';

const Countries = () => {
  const { i18n } = useTranslation();
  const basepath = i18n.language === 'uz' ? '/countries' : `/${i18n.language}/countries`
  return (
    // <Layout>
      <div style={{ overflowX: 'hidden' }}>
        <Router basepath={basepath}>
          <SingleCountry  path=":country" />
          <CountriesTable path="/" />
        </Router>
      </div>
    // </Layout>
  );
}


export default memo(Countries);
