import React from "react"
import { Link } from "gatsby"
// import { Router } from "@reach/router";

import Layout from "src/components/layout"
import Image from "src/components/image"
import SEO from "src/components/seo"
// import HistoryBarChart from 'src/components/HistoryBarChart'
// import HistoryBarChart2 from 'src/components/HistoryBarChart2'
// import HistoryBarChart3 from 'src/components/HistoryBarChart3'
import WorldMap from 'src/components/WorldMap'
import Home from 'src/compositions/Home'

const Content = () => (
  <>
  <h1>Hi from the second page</h1>
  <p>Welcome to page 2</p>
  <Link to="/">Go back to the homepage</Link>
  </>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Home />
  </Layout>
)

export default IndexPage
