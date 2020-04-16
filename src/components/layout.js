/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from 'reactstrap';

import Header from "./header"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flag-icon-css/css/flag-icon.min.css'
import 'src/static/fonts/fonts.css';
import "./layout.css"
import 'moment/locale/uz-latn';
import moment from 'moment';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container
        className="h-100"
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          fontFamily: "ProximaNova",
          // padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </Container>
      <footer className="my-5 d-flex justify-content-center font-light">
        © {new Date().getFullYear()}. <span className="ml-2 font-weight-bold">Made in Uzbekistan</span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
