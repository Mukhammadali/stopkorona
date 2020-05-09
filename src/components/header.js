import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import { Logo } from 'src/static/images';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';
import Link, { changeLocale } from 'src/lib/utils/i18n';

const languageName = {
  en: "English",
  uz: "O'zbekcha",
  ru: "русский",
}
const languageOptions = [
  {
    value: 'uz',
    label: "uz",
  },
  {
    value: 'en',
    label: "us",
  },
  {
    value: 'ru',
    label: "ru",
  },
]

const CustomOption = ({ innerRef, label, innerProps }) => {
  return (
  <span className={`country-flag my-2 flag-icon flag-icon-${label}`} ref={innerRef} {...innerProps}  />)
}

const CustomSingleValue = (props) => {
  return (
  <span className={`country-flag  flag-icon flag-icon-${props?.children || 'uz'}`} />)
}

const Language = () => {
  const { i18n } = useTranslation()
  const [currentLocale, setCurrentLocale] = useState(languageOptions.find(el => el.value === i18n.language) || languageOptions[0])
  useEffect(() => {
    if(i18n.language !== currentLocale.value){
      changeLocale(currentLocale.value)
    };
  }, [currentLocale])
  return (
      <ReactSelect
        options={languageOptions}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue
        }}
        styles={{
          container: (provided) => ({
            ...provided,
            width: 60,
            border: 'none',
            paddingTop: 10
          }),
          option: () => ({}),
          menuList: (provided) => ({
            // ...provided,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
          }),
          menu: (provided) => ({
            ...provided,
            width: 40,
            padding: 5,
            backgroundColor: '#f4f4f4',
            border: 'none',
            boxShadow: '0px 0px 10px 5px 0px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }),
          control: () => ({
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }),
          valueContainer: () => ({
            display: 'flex'
          }),
          indicatorSeparator: () => ({
            display: 'none'
          })
        }}
        isSearchable={false}
        value={currentLocale}
        onChange={(lang) => {
          setCurrentLocale(lang);
        }}
      />
  )
}
const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Logo width="200" height="50" />
        </Link> 
        <Language />
      </div>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header


export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .container {
    margin: 0px;
    padding: 1.45rem 0rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .country-flag {
      height: 20px;
      width: 35px;
    }
  }
`;