import React from 'react'
import { useQuery } from 'react-query'
import queryKeys from 'src/lib/constants/queryKeys'
import {numberWithCommas} from 'src/lib/utils';
import { fetchTotal } from 'src/lib/api'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import styled from 'styled-components'
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap'

const Stats = () => {
  const {data} = useQuery([queryKeys.TOTAL], fetchTotal)
  return (
    <StyledContainer>
        <Row className="d-flex align-items-stretch">
          <Col md="6" xl="3" className="mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2"
                  >
                    Yuqtirganlar
                  </CardTitle>
                  <div className="d-flex align-items-center">
                    <span className="h3 font-weight-bold mb-0">{numberWithCommas(data?.cases || 0)}</span>
                    <span className="text-success ml-2">
                      +343
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6" md="6" xl="3" className="mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2"
                  >
                    Aktivlar
                  </CardTitle>
                  <div className="d-flex align-items-center">
                    <span className="h3 font-weight-bold mb-0">{numberWithCommas(data?.active || 0)}</span>
                    <span className="text-success ml-2">
                      +343
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6" md="6" xl="3" className="mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2"
                  >
                    Tuzalganlar
                  </CardTitle>
                  <div className="d-flex align-items-center">
                    <span className="h3 font-weight-bold mb-0">{numberWithCommas(data?.recovered || 0)}</span>
                    <span className="text-success ml-2">
                      +343
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col  sm="6" xl="3" className="mb-3">
            <Card className="card-stats">
              <CardBody>
                <div className="flex-col h-100 justify-content-between">
                  <CardTitle
                    tag="h6"
                    className="text-uppercase text-muted mb-2"
                  >
                    Vafot etganlar
                  </CardTitle>
                  <div className="d-flex align-items-center">
                    <span className="h3 font-weight-bold mb-0">{numberWithCommas(data?.deaths || 0)}</span>
                    <span className="text-success ml-2">
                      +343
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </StyledContainer>
  )
}

export default Stats;


const StyledContainer = styled(Container)`
  .card-stats .card-body {
    padding: 1rem 1.5rem;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .card-stats {
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }
  .row > div {
    :first-child {
      padding-left: 0px;
    }
    :last-child {
      padding-right: 0px;
    }
  }
`;