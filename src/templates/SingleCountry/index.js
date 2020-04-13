import React, { memo } from 'react'
import styled from 'styled-components';
import Stats from '../Home/Stats';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal } from 'src/lib/api';
import SEO from 'src/components/seo';
import CountryTitle from 'src/components/CountryTitle';

const SingleCountry = ({ country, location }) => {
  const passedCountry = location?.state?.country;
  const { data } = useQuery([queryKeys.TOTAL_COUNTRY, { country: country }], fetchCountryTotal)
  const state = data ? data : passedCountry;
  return (
    <Styles>
      <SEO title={country} />
      <CountryTitle country={state} />
      <Stats data={state} />
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