import React, { memo } from 'react'
import { useQuery } from 'react-query'
import queryKeys from 'src/lib/constants/queryKeys'
import {numberWithCommas} from 'src/lib/utils';
import { fetchTotal } from 'src/lib/api'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import styled from 'styled-components'
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap'


const Stats = ({ data }) => {
  return (
    <StyledContainer>
        <Row className="d-flex align-items-stretch">
          <Col xs="6" md="3" xl="3" className="card-wrapper mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    Yuqtirganlar
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
          <Col xs="6" md="3" xl="3" className="card-wrapper mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2  font-weight-semibold"
                  >
                    Davolanayotganlar
                  </CardTitle>
                    <div className="stat d-flex align-items-center">
                      <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.active)}</span>
                    {
                      data?.todayActive ? (
                      <span className="text-success ml-2">
                        +{numberWithCommas(data.todayActive)}
                      </span>
                      ) : null
                    }
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6" md="3" xl="3" className="card-wrapper mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="font-weight-semibold text-uppercase text-muted mb-2"
                  >
                    Tuzalganlar
                  </CardTitle>
                  <div className="stat d-flex align-items-center">
                    <span className="h4 font-weight-semibold mb-0">{numberWithCommas(data?.recovered || 0)}</span>
                    {data?.todayRecovered ? (
                        <span className="text-success ml-2">
                          +{numberWithCommas(data?.todayRecovered)}
                        </span>
                      ): null}
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
                    Vafot etganlar
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
          <Col xs="6"  md="3" xl="3" className="card-wrapper mb-3">
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
          </Col>
        </Row>
    </StyledContainer>
  )
}

export default memo(Stats);


const StyledContainer = styled(Container)`
  .card-stats .card-body {
    padding: 1rem;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .card-wrapper {
    padding: 0px;
    padding-right: 10px;
    :last-child {
      padding-right: 0px;
    }
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