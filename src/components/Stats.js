import React, { memo } from 'react'
import { useQuery } from 'react-query'
import queryKeys from 'src/lib/constants/queryKeys'
import {numberWithCommas} from 'src/lib/utils';
import { fetchTotal } from 'src/lib/api'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import styled from 'styled-components'
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import { useTranslation } from 'react-i18next';


const Stats = ({ data, yesterday }) => {
  const {t} = useTranslation()
  const todayRecovered = data?.recovered - yesterday?.recovered;
  const todayActive = data?.active - yesterday?.active;
  return (
    <StyledContainer>
        <Row className="d-flex align-items-stretch">
          <Col xs="6" md="3" xl="3" className="card-wrapper">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    {t("Cases")}
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.cases || 0)}</span>
                  {data?.todayCases ? (
                      <span className="text-success ml-2">
                        +{numberWithCommas(data?.todayCases || 0)}
                      </span>
                  ):null}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6" md="3" xl="3" className="card-wrapper">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    {t("Active")}
                  </CardTitle>
                    <div className="stat d-flex align-items-center">
                      <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.active)}</span>
                    {
                      todayActive ? (
                      <span className={`text-${todayActive > 0 ? 'success' : 'danger'} ml-2`}>
                        {todayActive > 0 && '+'}{numberWithCommas(todayActive)}
                      </span>
                      ) : null
                    }
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6" md="3" xl="3" className="card-wrapper">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="font-weight-semibold text-uppercase text-muted mb-2"
                  >
                    {t("Recovered")}
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.recovered || 0)}</span>
                    {
                      todayRecovered ? (
                      <span className="text-success ml-2">
                        +{numberWithCommas(todayRecovered)}
                      </span>
                      ) : null
                    }
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6"  md="3" xl="3" className="card-wrapper">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    {t("Deaths")}
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.deaths || 0)}</span>
                    {data?.todayDeaths ? (
                      <span className="text-success ml-2">
                        +{numberWithCommas(data.todayDeaths)}
                      </span>
                    ): null}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs="6"  md="3" xl="3" className="card-wrapper mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    Jiddiy Ahvoldagilar
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.critical || 0)}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6"  md="3" xl="3" className="card-wrapper mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    Test Topshirganlar
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.tests || 0)}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
    </StyledContainer>
  )
}

export default memo(Stats);


const StyledContainer = styled(Container)`
  margin-top: 1rem;
  padding-bottom: 10px;
  .card-stats .card-body {
    padding: 1rem;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .card-wrapper {
     padding: 0px 5px;
     margin-top: 10px;
    .card-stats {
      height: 100%;
      border: none;
      border-radius: 0.5rem;
      box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
    }
  }
  @media only screen and (max-width: 980px) {
    .stat {
      flex-direction: column;
    }
  }
`;