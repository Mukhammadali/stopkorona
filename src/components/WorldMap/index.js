import React, { useMemo } from 'react';
import { ResponsiveChoropleth,  } from '@nivo/geo'
import { useQuery } from 'react-query';
import moize from 'moize'
import { isMobileOnly, isTablet } from 'react-device-detect';
import styled, {css } from 'styled-components';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries } from 'src/lib/api';
import worldCountries from 'src/assets/data/world_countries.json'
import Flag from "react-flags";
import getCountryISO2 from 'src/lib/utils/getCountryISO2';
// import 'flag--css/css/flag-css.css'
import 'flag-icon-css/css/flag-icon.min.css'

const memoizedData = moize(arr => {
  if(!Array.isArray(arr)) return [];
  return arr.map(el => ({
    ...el,
    id: el?.countryInfo?.iso3 || el?.countryInfo?.iso2,
    value: el?.cases || 0
  }))
})

const WorldMap = () => {
  const {data, isLoading} = useQuery(queryKeys.ALL_COUNTRIES, fetchAllCountries)
  const filteredData = memoizedData(data);
  return (
    <Wrapper className="w-100 h-100">
    <ResponsiveChoropleth
        data={filteredData || []}
        features={worldCountries.features}
        margin={{ top: isMobileOnly ? -100:50, right: 0, bottom: 0, left: 0 }}
        colors="YlOrBr"
        domain={[ 0, filteredData?.[0]?.value || 500000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        projectionScale={isMobileOnly? 50: 120}
        borderColor="#152538"
        tooltip={function(e){
          const feature = e?.feature;
          const data = e?.feature?.data;
          const countryName = data?.country || feature?.properties?.name
          return (
            <div className="map-tooltip">
              <span className={`mr-2 flag-icon flag-icon-${getCountryISO2(feature?.id)} `}></span>
              <span className="mb-2 font-weight-bold">{countryName}</span>
              {data? (
                <div>
                  <div>
                    <span className="mr-1 text-warning">Yuqtirganlar:</span>
                    <span >{data?.cases}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-info">Davolanayotganlar:</span>
                    <span >{data?.active}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-success">Tuzalganlar:</span>
                    <span>{data?.recovered}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-danger">O'lganlar:</span>
                    <span>{data?.deaths}</span>
                  </div>
                </div>
              ):(
                <div>Hali kuzatilmagan!</div>
              )}
            </div>
          )
        }}

        legends={[
            {
              anchor: isMobileOnly ? 'bottom': 'bottom-left',
              direction: 'column',
              justify: true,
              translateX: 20,
              translateY: isMobileOnly ? -50:-200,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: '#444444',
              itemOpacity: 0.85,
              symbolSize: 18,
            }
        ]}
    />
    </Wrapper>
  )
}

export default WorldMap;


const Wrapper = styled.div`
  .map-tooltip {
    background-color: black;
    padding: 1.2rem;
    /* width: 11rem; */
    border-radius: 2px;
    color: white;
  }
  .flag-icon {
    border-radius: 2px;
  }
  path:hover {
    /* stroke: rgba(0,0,0,0.5); */
    stroke-width: 3;
    /* opacity: 0.6; */
  }
`;