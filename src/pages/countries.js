import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Content = ({country}) => {
  return(
  <>
  <h1>Hi {country}</h1>
  <p>Welcome to page 2</p>
  <Link to="/">Go back to the homepage</Link>
  </>
)
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Router>
      <Content path="/countries/:country" />
    </Router>
  </Layout>
)

export default SecondPage
