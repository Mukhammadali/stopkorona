import React, { memo } from "react"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'
import { useIntl } from 'gatsby-plugin-intl';

const IndexPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <h2>{intl.formatMessage({id: "greeting"})}</h2>
      <Uzbekistan />
    </Layout>
  )
}

export default memo(IndexPage)