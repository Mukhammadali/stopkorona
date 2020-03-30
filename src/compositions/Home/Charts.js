import React from 'react'
import WorldMap from 'src/components/WorldMap'
import { Row } from 'reactstrap'

const Charts = () => {
  return (
    <div>
      <Row style={{width: '100%', height: 600}}>
        <WorldMap />
      </Row>
    </div>
  )
}

export default Charts
