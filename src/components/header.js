import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from 'styled-components';
import { Logo } from 'src/static/images';
import i18n from 'src/translation/i18n';

const languageName = {
  en: "English",
  uz: "O'zbekcha",
  ru: "русский",
}

const Language = () => {
  // i18n.language
  console.log('i18n.language:', i18n.language)
  const changeLanguage = (lng) => {
    console.log('lng:', lng)
    localStorage.setItem('stopkorona_uz_locale', lng);
    i18n.changeLanguage(lng);
  }
  return (
    <div>
      {
          ['en', 'uz', 'ru'].map(language => (
            <span
              key={language}
              onClick={() => changeLanguage(language)}
              style={{
                // color: currentLocale === language ? `red` : `black`,
                margin: 10,
                textDecoration: `underline`,
                cursor: `pointer`,
              }}
            >
              {languageName[language]}
            </span>
          ))
      }
    </div>
  )
}
const Header = () => {
  return (
    <StyledHeader>
      <div style={{ margin: 0, padding: '1.45rem 0rem' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Logo width="200" height="50" />
        </Link> 
      </div>
      <div>
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

`;