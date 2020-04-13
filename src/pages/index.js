import React from "react"
import { Link } from "gatsby"
import Layout from "src/components/layout"
import Image from "src/components/image"
import SEO from "src/components/seo"
import WorldMap from 'src/components/WorldMap'
import Home from 'src/templates/Home'
import Uzbekistan from 'src/templates/Uzbekistan'


const IndexPage = ({pageContext}) => {
  const historicalData = pageContext;
  return (
    <Layout>
      <SEO title="O'zbekiston koronavirus statistikasi" />
      <Uzbekistan historical={pageContext}/>
    </Layout>
  )
}

export default IndexPage
