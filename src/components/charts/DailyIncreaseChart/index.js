import React, { useRef, useMemo } from 'react'
import Chart from "react-apexcharts";
import moment from "moment";
import { isMobileOnly } from 'react-device-detect';
import { numberWithCommas } from 'src/lib/utils'

import { isBrowser } from 'react-device-detect';
import { uzLocale } from 'src/lib/config/apexCharts'


const DailyIncreaseChart = ({ data, total }) => {
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
    const newCases = slicedCases.map((el, idx) => idx === 0 ? [slicedLabels[idx], el] : [slicedLabels[idx], el - slicedCases[idx -1]]);
    if (total) {
      const lastDate = slicedLabels[slicedLabels.length - 1];
      const latestDate = moment(total?.updated, 'x').format('MM/DD/YY');
      if(lastDate !== latestDate){
        slicedLabels.push(latestDate);
        newCases.push([latestDate, total?.cases - slicedCases[slicedCases?.length - 1]]);
      }
    }
    return {
      cases: isMobileOnly ? newCases.slice(newCases?.length - 10) : newCases,
    };
  }, [data, total])
  
  return (
    <div className="my-3" style={{height: isBrowser ? 450 : 'auto'}}>
     <Chart
        height={isBrowser ? 420 : 'auto'}
        options={{
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top',
                },
              }
            },
            responsive: [{
              breakpoint: '300',
              options: {},
            }],
            colors: ['#2E93fA'],
            legend: {
              show: false,
            }, 
            chart: {
              height: 350,
              animations: {
                  enabled: true,
                  animateGradually: {
                      enabled: true,
                  },
                  dynamicAnimation: {
                      enabled: true,
                  }
              },
              locales:[
                uzLocale
              ],
              defaultLocale: 'uz',
              id: "basic-bar",
              toolbar: {
                show: false,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download: true,
                  selection: false,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset: false,
                },
              },
            },
            dataLabels: {
              enabled: true,
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            xaxis: {
              type: 'datetime',
              labels: {
                datetimeUTC: false,
                format: 'd MMMM',
                datetimeFormatter: {
                  year: 'yyyy',
                  month: "d MMMM",
                  day: 'd MMMM',
                  hour: 'HH:mm',
                },
              }
            },
            yaxis: {
              labels: {
                formatter (value) {
                  return numberWithCommas(value);
                }
              },
            }
        }}
        series={[
          {
            name: "Yuqtirganlar",
            data:  transformed?.cases
          },
        ]}
        type="bar"
        width="100%"
        ref={chartRef}
      />
    </div>
  )
}

export default DailyIncreaseChart
