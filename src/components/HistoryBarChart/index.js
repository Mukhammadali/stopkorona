import React, { useMemo } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import data2 from "src/mock-data/bar";
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical } from 'src/lib/api';
import { useCountryHistorical } from 'src/hooks/stats';

const HistoryBarChart = () => {
  const {data, status} = useCountryHistorical({ countryName: 'Uzbekistan' });
  const casesArray = useMemo(() => {
      const cases = data?.timeline?.cases || {};
      if(isEmpty(cases)) return [];
      const lastLeadingZeroIndex = Object.values(cases).findIndex(el => el > 0);
      const slicedCases = Object.keys(cases).slice(lastLeadingZeroIndex);
      return slicedCases?.map(el => ({
          date: el,
          value: cases[el]
        }))
    }, [data])
return (
  <ResponsiveBar
      data={casesArray || []}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
    //   groupMode="grouped"
      colors={{ scheme: 'nivo' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Sana',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Yuqtirganlar soni',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
 
      animate={true}
      motionStiffness={90}
      motionDamping={15}
  />
)
    }

export default HistoryBarChart
