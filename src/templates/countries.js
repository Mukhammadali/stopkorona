import React, { memo } from 'react'
import SEO from 'src/components/seo';
import CountriesTable from 'src/components/CountriesTable';
import Layout from 'src/components/Layout';
import { Router } from '@reach/router';
import SingleCountry from 'src/containers/SingleCountry';

const Countries = () => {
  return (
    <Layout>
      <SEO title="Davlatlar Koronavirus statistikasi" description="Butun dunyo davlatlarining koronavirus statistikasi jadvali"/>
      <div style={{
        overflowX: 'hidden'
      }}>
        <Router basepath="/countries">
          <SingleCountry  path="/:country" />
          <CountriesTable path="/" />
        </Router>
      </div>
    </Layout>
  );
}


export default memo(Countries);
