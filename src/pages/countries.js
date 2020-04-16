import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SingleCountry from 'src/templates/SingleCountry'
import Home from 'src/templates/Home'
import CountriesTable from 'src/templates/Home/CountriesTable'


const Countries = (props) => {
  return(
    <Layout>
      <Router basepath="/countries">
        <SingleCountry path="/:country" />
        <CountriesTable path="/" />
      </Router>
    </Layout>
  )
}

export default Countries
