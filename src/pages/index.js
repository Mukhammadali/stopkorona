import React, { memo } from "react"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'
import { useTranslation, } from 'react-i18next'

const IndexPage = () => {
  const {t, ...rest} = useTranslation();
  console.log('rest:', rest)
  return (
    <Layout>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <h2>{t('test')}</h2>
      <Uzbekistan />
    </Layout>
  )
}

export default memo(IndexPage)