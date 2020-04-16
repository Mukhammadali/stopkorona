import React, { Suspense } from "react"
import { Link } from "gatsby"
import 'rc-tabs/assets/index.css';
import { GoGlobe } from 'react-icons/go'
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'
// import Home from 'src/templates/Home'
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import InkTabBar from 'rc-tabs/lib/InkTabBar';
import { isMobile } from 'react-device-detect'
import styled from 'styled-components';
import { Router } from '@reach/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTabAction } from 'src/redux/global/globalActions';

const Home = React.lazy(() => import('src/templates/Home'))

const MainPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(store => store.global.activeTab)
  const updateTab = key => dispatch(updateTabAction(key));
  return (
  <Styles>
      <Tabs
        onChange={updateTab}
        data-extra="tabs"
        renderTabBar={() =>
          <InkTabBar
            pageSize={isMobile ? 2 : 4}
            speed={5}
            data-extra="tabbar"
          />
        }
        renderTabContent={() => <TabContent animated={false} />}
        activeKey={activeTab}
      >
        <TabPane tab={(
          <div className="font-weight-semibold d-flex align-items-center">
            <span className="country-flag mr-2 flag-icon flag-icon-uz" />
            <h5 className="mb-0 font-semibold">O'zbekiston</h5>
          </div>
        )} data-extra="tabpane" key="uzbekistan">
          <Uzbekistan />
        </TabPane>
        <TabPane  tab={(
          <div className="font-weight-semibold d-flex align-items-center">
          <GoGlobe className="mr-1 globe-icon" />
          <h5 className="mb-0 font-semibold">Global</h5>
        </div>
        )} data-extra="tabpane" key="world">
          <Suspense fallback={(
            <div className="my-3 row justify-content-center align-items-center" style={{height: 450}}>
              <div class="spinner-border text-secondary" style={{height: '3rem', width: '3rem'}}  role="status" />
            </div>
          )}>
            <Home />
          </Suspense>
        </TabPane>
      </Tabs>
    </Styles>
  )
}

const IndexPage = ({pageContext}) => {
  return (
    <Layout>
      <SEO title="Koronavirus statistikasi" description="O'zbekiston va Butun Jahon to'liq statistikasi. Koronavirus kunlik o'sishini kuzatishingiz mumkin" />
      <MainPage />
    </Layout>
  )
}

export default IndexPage

const Styles = styled.div`
  .country-flag {
    height: 25px;
    width: 30px;
  }
  .globe-icon {
    font-size: 25px;
    :not:active{
      color: #212529e8;
    }
  }
  .rc-tabs-tab {
    display: flex;
    justify-content: center !important;
    padding-left: 5px !important;
    margin-right: 0px;
    @media only screen and (max-width: 600px) {
      width: calc(100% / 2);
    }
    @media only screen and (min-width: 600px) {
      width: 180px;
    }
    /* :first-child::after {
      content: "";
      height: 5px;
      width: 2px;
      background-color: 1px solid #cecece;
    } */
    :focus {
      outline: none !important;
    }
  }
  .rc-tabs-tabpane {
    :focus {
      outline: none;
    }
  }
  h5 {
    font-size: 1.2rem;
  }
`;