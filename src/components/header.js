import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from 'styled-components';
import { Logo } from 'src/static/images';
import { changeLocale, useIntl, IntlContextConsumer } from 'gatsby-plugin-intl'

const languageName = {
  en: "English",
  uz: "O'zbekcha",
  ru: "русский",
}

const Language = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <Link
              key={language}
              onClick={() => changeLocale(language)}
              style={{
                color: currentLocale === language ? `red` : `black`,
                margin: 10,
                textDecoration: `underline`,
                cursor: `pointer`,
              }}
            >
              {languageName[language]}
            </Link>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}
const Header = () => {
  const { locale } = useIntl()
  console.log('locale:', locale)
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