import React from 'react'
import WorldMap from 'src/components/WorldMap'
import { Row } from 'reactstrap'
import { useQuery } from 'react-query'
import queryKeys from 'src/lib/constants/queryKeys'
import { fetchAllCountries } from 'src/lib/api'

const Charts = () => {
  const {data, isLoading} = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  return (
    <div>
      {/* <Row style={{width: '100%', height: 600}}>
        <WorldMap data={data} />
      </Row> */}
    </div>
  )
}

export default Charts
