import React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components';
import moment from 'moment';
import getCountryISO2 from 'src/lib/utils/getCountryISO2';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
 
const CountryTitle = ({ country }) => {
  if(!country) return null;
  return (
    <Styles className="d-flex align-items-end mb-3">
      <div className="font-weight-semibold d-flex align-items-center">
        <span className={`country-flag mr-2 flag-icon flag-icon-${country?.countryInfo?.iso2?.toLowerCase()} `} />
        <h3 className="mb-0">{getCountryUzbekName(country?.countryInfo?.iso2)}</h3>
      </div>
      {country?.updated && (
        <span className="ml-3 mb-1 font-info">Yangilangan vaqti: {moment(country.updated, 'x').format('HH:mm')}</span>
      )}
    </Styles>
  )
}

export default CountryTitle

const Styles = styled.div`
  .country-flag {
    height: 30px;
    width: 50px;
  }
`;
