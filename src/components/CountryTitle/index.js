import React from 'react'
import styled from 'styled-components';
import {MdArrowBack} from "react-icons/md"
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';
import { navigate } from 'src/lib/utils/i18n';
import { useTranslation } from 'react-i18next';
 
const CountryTitle = ({ country, goBack }) => {
  if(!country) return null;
  const isUzbekistan = country?.countryInfo?.iso2 == 'UZ';
  const {t, i18n} = useTranslation()
  const isLocaleUzbek = i18n.language === 'uz'
  return (
    <Styles className="d-flex align-items-center mb-3">
      {
        goBack && (
          <div className="goback-button mr-3" onClick={() => navigate("/countries")}>
            <MdArrowBack color="#3a3a3a" size={30}/>
          </div>
        )
      }
      <div className="font-weight-semibold d-flex align-items-center">
        <span className={`country-flag mr-2 flag-icon flag-icon-${country?.countryInfo?.iso2?.toLowerCase()} `} />
        <h3 className="mb-0">{isUzbekistan ? t("Uzbekistan") : isLocaleUzbek? getCountryUzbekName(country?.countryInfo?.iso2): (country?.country)}</h3>
      </div>
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
    cursor: pointer;
    height: 100%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transition: 0.2s ease-in-out; */
    :hover {
      border-radius: 100px;
      background-color: #cecbcb40;
      transition: all 0.2s ease-in-out;
    }
  }
  .country-flag {
    height: 25px;
    width: 50px;
  }
`;
