import React, { memo } from "react"
import { Link } from "gatsby"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'
import styled from 'styled-components';
import { useState } from 'react';

const IndexPage = () => {
  return (
    <Layout withLogo>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <Uzbekistan />
    </Layout>
  )
}

export default memo(IndexPage)