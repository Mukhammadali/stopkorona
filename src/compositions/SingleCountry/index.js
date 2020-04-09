import React, { memo } from 'react'
import styled from 'styled-components';
import Stats from '../Home/Stats';
import { useQuery } from 'react-query';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryTotal } from 'src/lib/api';
import SEO from 'src/components/seo';

const SingleCountry = ({ country, location }) => {
  const passedCountry = location?.state?.country;
  const { data } = useQuery([queryKeys.TOTAL_COUNTRY, { country: country }], fetchCountryTotal)
  const state = data ? data : passedCountry;
  return (
    <Styles>
      <SEO title={country} />
      <div className="d-flex align-items-center mb-3">
        <span className={`country-flag mr-2 flag-icon flag-icon-${state?.countryInfo?.iso2?.toLowerCase()} `}></span>
        <h3 className="mb-0">{state?.country}</h3>
      </div>
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