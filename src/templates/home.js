import React from "react"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/containers/Uzbekistan'
import { useTranslation } from 'react-i18next'

const IndexPage = (props) => {
  console.log('props Home:', props)
  const {t, ...rest } = useTranslation("common");
  console.log('rest:', rest)
  return (
    <Layout>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <h2>{t('common.test')}</h2>
      <Uzbekistan />
    </Layout>
  )
}

export default IndexPage