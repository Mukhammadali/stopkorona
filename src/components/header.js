import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from 'styled-components';
import { Logo } from 'src/static/images';

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