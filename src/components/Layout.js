import React, { memo, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { GoHome, GoGlobe, GoSearch } from 'react-icons/go';
import { BsTable } from 'react-icons/bs';
import Header from "./header"
import styled from 'styled-components';
import { isMobileOnly } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import Link, {changeLocale }  from 'src/lib/utils/i18n';
// import i18n from 'src/translation/i18n';

const NavLink = memo(props => (
  <Link
    {...props}
    getProps={({ isCurrent, ...rest }) => {
      return {
        className: `${props.className} ${isCurrent && 'active'}`,
        style: {  
          color: isCurrent ? "#222222" : "#8C8C8C",
        },
      };
    }}
  />
));

const Layout = ({ children, withLogo }) => {
  const {i18n} = useTranslation();
  useEffect(() => {
    window.___siteLanguage = i18n.language;
  }, [i18n.language])
  useEffect(() => {
    const language = localStorage.getItem('stopkorona_uz_locale');
    if(language && language !== i18n.language){
      changeLocale(i18n.language);
    }
  }, [])
  return (
    <>
      <Styles >
        <div className="container">
          <Header />
          <DesktopTabbar onTouchMove={event => event.preventDefault()}>
            <NavLink to="/" className="menu-item">
              <GoHome size="1.5rem" />
              <span>Mahalliy</span>
            </NavLink>
            <NavLink to="/global" className="menu-item">
              <GoGlobe size="1.5rem"  />
              <span>Global</span>
            </NavLink>
            <NavLink to="/countries" className="menu-item">
              <BsTable  size="1.5rem" />
              <span>Davlatlar</span>
            </NavLink>
          </DesktopTabbar>
          <main className="container-content">{children}</main>
          <footer className="d-flex justify-content-center font-light">
            © {new Date().getFullYear()}.
              <span className="ml-2">
                Made by
                <a href="https://twitter.com/_mukhammadali" target="_blank" className="ml-2 decoration-underline font-weight-bold">
                  Muhammad Ali
                </a>
              </span>
          </footer>
        </div>
      </Styles>
      <Tabbar onTouchMove={event => event.preventDefault()}>
        <NavLink  to="/" className="menu-item">
          <GoHome size="1.5rem" />
          <span>Mahalliy</span>
        </NavLink>
        <NavLink to="/global" className="menu-item">
          <GoGlobe size="1.5rem"  />
          <span>Global</span>
        </NavLink>
        <NavLink to="/countries" className="menu-item">
          <BsTable  size="1.5rem" />
          <span>Davlatlar</span>
        </NavLink>
      </Tabbar>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default memo(Layout)

const DesktopTabbar = styled.div`
  display: flex !important;
  /* position: sticky; */
  /* top: 0px; */
  background-color: white;
  z-index: 100;
  margin-bottom: 20px;
  justify-content: center;
  .menu-item {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    /* width: 100px; */
    margin: 0px 20px;
    text-decoration: none;
    padding: 5px 0px;
    border-bottom: 1px solid white;
    &.active {
      border-bottom: 1px solid #222;
    }
    span {
      margin-left: 5px;
    }
  }
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`;

const Tabbar = styled.div`
  display: none !important;
  @media only screen and (max-width: 600px) {
    display: flex !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border: none;
    justify-content: space-around;
    background-color: #f4f4f4;
    min-height: 50px;
    z-index: 16;
    padding-bottom:env(safe-area-inset-bottom, 0px);
    .menu-item {
      display: flex;
      padding-top: 5px;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      justify-content: center;
      width: 4rem;
      height: 100%;
      color: #8C8C8C;
      span {
        font-size: 0.7rem;
        font-family: ProximaNova Regular;
      }
    }
  }
`;

const Styles = styled.div`
  font-family: ProximaNova Regular;
  footer {
    margin: 20px 0px;
  }
  @media only screen and (max-width: 600px) {
    /* height: 100%; */
    /* overflow-y: auto; */
    footer {
      margin-top: 10px !important;
      margin-bottom: 80px !important;
    }
  }
  .container {
    margin: 0px auto;
    max-width: 960px;
    @media only screen and (max-width: 600px) {
      /* height: calc(100% - 50px); */
      /* overflow-y: scroll; */
    }
  }
`;