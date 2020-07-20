import React, { useMemo } from 'react';
import { ResponsiveChoropleth  } from '@nivo/geo'
import { useQuery } from 'react-query';
import moize from 'moize'
import { isMobileOnly } from 'react-device-detect';
import styled, {css } from 'styled-components';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchAllCountries } from 'src/lib/api';
import worldCountries from 'src/static/data/world_countries.json'
import { useTranslation } from 'react-i18next';
import { getCountryUzbekName } from 'src/lib/utils/getCountryName';

const memoizedData = moize(arr => {
  if(!Array.isArray(arr)) return [];
  return arr.map(el => ({
    ...el,
    id: el?.countryInfo?.iso3 || el?.countryInfo?.iso2,
    value: el?.cases || 0
  }))
})

const WorldMap = ({data}) => {

  const filteredData = memoizedData(data);
  const {t, i18n} = useTranslation()
  const isLocaleUzbek = i18n.language === 'uz';
  return (
    <Wrapper className="w-100 h-100">
    <ResponsiveChoropleth
        data={filteredData || []}
        features={worldCountries.features}
        margin={{ top: isMobileOnly ? -100:60, right: 0, bottom: 0, left: isMobileOnly ?0 : 50 }}
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
          const countryName = isLocaleUzbek ? getCountryUzbekName(data?.countryInfo?.iso2) : (data?.country || feature?.properties?.name)
          return (
            <div className="map-tooltip">
              <span className={`mr-2 flag-icon flag-icon-${data?.countryInfo?.iso2?.toLowerCase()} `}></span>
              <span className="mb-2 font-weight-bold">{countryName}</span>
              {data? (
                <div>
                  <div>
                    <span className="mr-1 text-warning">{t("Cases")}:</span>
                    <span >{data?.cases}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-info">{t("Active")}:</span>
                    <span >{data?.active}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-success">{t("Recovered")}:</span>
                    <span>{data?.recovered}</span>
                  </div>
                  <div>
                    <span className="mr-1 text-danger">{t("Deaths")}:</span>
                    <span>{data?.deaths}</span>
                  </div>
                </div>
              ):(
                <div>Not found!</div>
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
    border-radius: 2px;
    color: white;
  }
  .flag-icon {
    border-radius: 2px;
  }
  path:hover {
    stroke-width: 3;
  }
`;