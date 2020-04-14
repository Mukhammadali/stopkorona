import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SingleCountry from 'src/templates/SingleCountry'
import Home from 'src/templates/Home'


const Countries = (props) => {
  console.log('rendered', props)
  return(
  <Layout>
    <Router basepath="/countries">
      <SingleCountry path="/countries/:country" />
      <Home path="/" />
    </Router>
  </Layout>
)
  }

export default Countries
