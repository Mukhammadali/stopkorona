import React, { memo } from "react"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <Uzbekistan />
    </Layout>
  )
}

export default memo(IndexPage)