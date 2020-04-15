import React from "react"
import { Link } from "gatsby"
import 'rc-tabs/assets/index.css';
import { GoGlobe } from 'react-icons/go'
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import Uzbekistan from 'src/templates/Uzbekistan'
import Home from 'src/templates/Home'
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import { isMobile } from 'react-device-detect'
import styled from 'styled-components';
import { Router } from '@reach/router';

const MainPage = () => (
  <Styles>
      <Tabs
        data-extra="tabs"
        renderTabBar={() =>
          <SwipeableInkTabBar
            pageSize={isMobile ? 2 : 4}
            speed={5}
            data-extra="tabbar"
          />
        }
        renderTabContent={() => <TabContent />}
        defaultActiveKey="uzbekistan"
      >
        <TabPane tab={(
          <div className="font-weight-semibold d-flex align-items-center">
            <span className="country-flag mr-2 flag-icon flag-icon-uz" />
            <h5 className="mb-0 font-semibold">O'zbekiston</h5>
          </div>
        )} data-extra="tabpane" key="uzbekistan">
          <Uzbekistan />
        </TabPane>
        <TabPane forceRender tab={(
          <div className="font-weight-semibold d-flex align-items-center">
          <GoGlobe className="mr-1 globe-icon" />
          <h5 className="mb-0 font-semibold">Global</h5>
        </div>
        )} data-extra="tabpane" key="world">
          <Home />
        </TabPane>
      </Tabs>
    </Styles>
)

const IndexPage = ({pageContext}) => {
  return (
    <Layout>
      <SEO title="O'zbekiston koronavirus statistikasi" />
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
  .rc-tabs-nav {
    .rc-tabs-tab {
      justify-content: start !important;
      padding-left: 5px !important;
      /* :first-child::after {
        content: "";
        height: 5px;
        width: 2px;
        background-color: 1px solid #cecece;
      } */
      :focus {
        outline: none;
      }
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