import React, { useRef, useMemo, useEffect } from 'react'
import Chart from "react-apexcharts";
import moment from "moment";
import { isMobileOnly } from 'react-device-detect';
import { numberWithCommas } from 'src/lib/utils'


import { isBrowser } from 'react-device-detect';
import { uzLocale } from 'src/lib/config/apexCharts'


const DailyIncreaseChart = ({ data, total }) => {
  const chartRef = useRef();
  useEffect(() => {
    moment.locale('uz-latn');
    var currentLocaleData = moment.localeData();
    console.log('currentLocaleData:', currentLocaleData)
  }, [])
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
      const latestDate = moment(total?.updated, 'x').format('MM/DD/YY');
      if(lastDate !== latestDate){
        slicedLabels.push(latestDate);
        newCases.push(total?.cases - slicedCases[slicedCases?.length - 1]);
      }
    }
    const finalLabels = isMobileOnly ? slicedLabels.slice(slicedLabels?.length - 10) : slicedLabels;
    const finalCases = isMobileOnly ? newCases.slice(newCases?.length - 10) : newCases;
    return {
      labels: finalLabels,
      cases: finalCases
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
              // type: 'datetime',
              categories: transformed?.labels || [],
              labels: {
                datetimeUTC: false,
                formatter:  function(val, timestamp) {
                  console.log('timestamp:', timestamp)
                  console.log('val:', val)
                  const date = moment(new Date(timestamp)).locale('uzb').format('D MMMM');
                  console.log('date:', date)
                  return date;
                },
                // format: 'd MMMM',
                // datetimeFormatter: {
                //   year: 'yyyy',
                //   month: "d MMMM",
                //   day: 'd MMMM',
                //   hour: 'HH:mm',
                // },
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
