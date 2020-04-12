import React from "react"
import { Link } from "gatsby"
import Layout from "src/components/layout"
import Image from "src/components/image"
import SEO from "src/components/seo"
import WorldMap from 'src/components/WorldMap'
import Home from 'src/compositions/Home'
import Uzbekistan from 'src/compositions/Uzbekistan'


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Uzbekistan />
  </Layout>
)

export default IndexPage
