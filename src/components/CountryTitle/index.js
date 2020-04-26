import React from 'react'
import styled from 'styled-components';
import moment from 'moment';
import {MdArrowBack} from "react-icons/md"
import getCountryISO2 from 'src/lib/utils/getCountryISO2';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
import { navigate } from '@reach/router';
 
const CountryTitle = ({ country, goBack }) => {
  if(!country) return null;
  return (
    <Styles className="d-flex align-items-center mb-3">
      {
        goBack && (
          <div className="goback-button" onClick={() => navigate(-1)}>
            <MdArrowBack color="#3a3a3a" className="mr-3" size={30}/>
          </div>
        )
      }
      <div className="font-weight-semibold d-flex align-items-center">
        <span className={`country-flag mr-2 flag-icon flag-icon-${country?.countryInfo?.iso2?.toLowerCase()} `} />
        <h3 className="mb-0">{getCountryUzbekName(country?.countryInfo?.iso2)}</h3>
      </div>
      {/* {country?.updated && (
        <span className="ml-3 mb-1 font-info">{moment(country.updated).toNow(true)} oldin yangilandi</span>
      )} */}
    </Styles>
  )
}

CountryTitle.defaultProps = {
  goBack: false
}

export default CountryTitle

const Styles = styled.div`
  h3 {
    font-size: 1.5rem;
  }
  .goback-button {
    height: 100%;
    width: 60px;
  }
  .country-flag {
    height: 25px;
    width: 50px;
  }
`;
