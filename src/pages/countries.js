import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SingleCountry from 'src/templates/SingleCountry'
import Home from 'src/templates/Home'


const SecondPage = () => (
  <Layout>
    <Router>
      <SingleCountry path="/countries/:country" />
      <Home default />
    </Router>
  </Layout>
)

export default SecondPage
