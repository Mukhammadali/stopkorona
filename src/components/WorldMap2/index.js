import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled, {css } from 'styled-components';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries } from 'src/lib/api';
import {VectorMap} from 'react-jvectormap';
// import worldCountries from 'src/static/data/world_countries.json'
// import 'flag-css/css/flag-css.css'

const mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const WorldMap2 = () => {
  const {data, isLoading} = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  console.log('data2:', data)
  const filteredData = useMemo(()=>{
    if(!Array.isArray(data)) return [];
    return data.map(el => ({
      ...el,
      id: el?.countryInfo?.iso3 || el?.countryInfo?.iso2,
      value: el?.cases || 0
    }))
  },[data])
  console.log('filteredData:', filteredData)
  return (
    <Wrapper>
      <VectorMap
        containerClassName="vector-map"
        containerStyle={{
          width: '100%',
          height: '600px',
        }}
        map="world_mill"
        zoomOnScroll={false}
        scaleColors={['#f00', '#0071A4']}
        normalizeFunction="polynomial"
        hoverOpacity={0.7}
        hoverColor={false}
        backgroundColor="transparent"
        regionStyle={{
          initial: {
            fill: '#e9ecef',
            'fill-opacity': 0.8,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 1,
          },
          hover: {
            fill: '#dee2e6',
            'fill-opacity': 0.8,
            cursor: 'pointer',
          },
          selected: {
            fill: 'yellow',
          },
          selectedHover: {},
        }}
        markerStyle={{
          initial: {
            fill: '#fb6340',
            'stroke-width': 0,
          },
          hover: {
            fill: '#11cdef',
            'stroke-width': 0,
          },
        }}
        series={{
          regions: [
            {
              values: mapData,
              scale: ['#ced4da', '#adb5bd'],
              normalizeFunction: 'polynomial',
            },
          ],
        }}
      />
    </Wrapper>
  )
}

export default WorldMap2;


const Wrapper = styled.div`
  .vector-map {
    position: relative;
    height: 600px;
  }

  .vector-map-sm {
    height: 280px;
  }
  .vector-map .jvectormap-zoomin,
.vector-map .jvectormap-zoomout {
  cursor: pointer;
  margin-right: .5rem;
  font-size: .75rem;
  transition: all .15s ease;
  letter-spacing: .025em;
  text-transform: none;
  will-change: transform;
  line-height: 1.5;
  padding: .25rem .5rem;
  border-radius: .25rem;
  color: #fff;
  border-color: #5e72e4;
  background-color: #5e72e4;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  font-weight: 600;
  display: inline-block;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  border: 1px solid transparent;
}

`;