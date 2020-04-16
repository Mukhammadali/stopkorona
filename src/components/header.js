import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { slide as Menu } from 'react-burger-menu'
import ReactLogo from '../static/images/site-logo.svg';
import styled from 'styled-components';
import { navigate } from '@reach/router';

const Header = ({ siteTitle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = (route) => {
    setMenuOpen(false)
    navigate(route);
  }
  
  return (
    <StyledHeader>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        {/* <h1 style={{ margin: 0 }}> */}
        <div style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <ReactLogo width="200" height="50" />
            {/* {siteTitle} */}
          </Link>
          {/* <Link to="/page2" >Page 2</Link>
          <Link to="/page3" >Page 3</Link>
          <Link to="/countries" >Global</Link>
          <Link to="/countries/USA" >USA</Link> */}
          
          
        </div>
        {/* </h1> */}
      </div>
      {/* <Menu right={true} isOpen={menuOpen} onStateChange={state => {
        if(state.isOpen !== menuOpen){
          setMenuOpen(state.isOpen)
        }
      }}>
        <span onClick={() =>closeMenu("/")} id="home" className="menu-item">Asosiy</span>
        <span onClick={() => closeMenu("/countries")} id="contact" className="menu-item">Butun Dunyo</span>
      </Menu> */}
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
  /* Position and sizing of burger button */
  /* margin-bottom: 1.45rem; */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  right: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
  font-size: 20px;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
`;