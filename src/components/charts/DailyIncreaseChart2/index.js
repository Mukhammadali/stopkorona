import React, { useRef, useMemo } from 'react'
import Chart from "react-apexcharts";
import {Bar} from 'react-chartjs-2';
import { numberWithCommas } from 'src/lib/utils'

import { isBrowser } from 'react-device-detect';
import { uzLocale } from 'src/lib/config/apexCharts'
import { formatUnixTime } from 'src/lib/utils/date';


const DailyIncreaseChart2 = ({ data, total }) => {
  const chartRef = useRef();
  const transformed = useMemo(() => {
    const labels=[];
    const cases=[];
    const recovered=[];
    const deaths=[];
    
    if(!data?.cases) return {
      labels,
      cases,
      recovered,
      deaths
    };
    const lastLeadingZeroIndex = Object.values(data?.cases).findIndex(el => el > 0);
    const slicedLabels = Object.keys(data?.cases).slice(lastLeadingZeroIndex)
    const slicedCases = Object.values(data?.cases).slice(lastLeadingZeroIndex)
    const newCases = slicedCases.map((el, idx) => idx === 0 ? el : el - slicedCases[idx -1]);
    if (total) {
      const lastDate = slicedLabels[slicedLabels.length - 1];
      const latestDate = formatUnixTime(total?.updated, 'MM/dd/yy');
      if(lastDate !== latestDate){
        slicedLabels.push(latestDate);
        newCases.push(total?.cases - slicedCases[slicedCases?.length - 1]);
      }
    }
    return {
      labels: slicedLabels,
      cases: newCases,
    };
  }, [data, total])

  
  return (
    <div className="my-3" style={{height: isBrowser ? 450 : 'auto'}}>
     <Bar
        data={{
          labels: transformed?.labels || [],
          datasets: [
            {
              label: 'Yuqtirganlar',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: transformed?.cases || []
            }
          ]
        }}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
          tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
        }}
      />
    </div>
  )
}

export default DailyIncreaseChart2
