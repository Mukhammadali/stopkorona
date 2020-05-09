import React, { useRef, useMemo, useEffect, memo } from 'react'
import Chart from "react-apexcharts";
import moment from "moment";
import { isMobileOnly } from 'react-device-detect';
import { numberWithCommas } from 'src/lib/utils'

import { isBrowser } from 'react-device-detect';
import { uzLocale } from 'src/lib/config/apexCharts'
import ruLocale from 'apexcharts/dist/locales/ru.json'
import enLocale from 'apexcharts/dist/locales/en.json'
import { useTranslation } from 'react-i18next';

const DailyIncreaseChart = ({ data, limit, total }) => {
  const { i18n } = useTranslation()
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
    const newCases = slicedCases.map((el, idx) => idx === 0 ? el : el - slicedCases[idx -1] >= 0 ? el - slicedCases[idx -1] : slicedCases[idx -1] - slicedCases[idx -2] );
    if (total) {
      const lastDate = slicedLabels[slicedLabels.length - 1];
      const lastCase = slicedCases[slicedCases?.length - 1];
      const latestDate = moment(total?.updated, 'x').format('MM/DD/YY');
      if(lastDate !== latestDate){
        slicedLabels.push(moment(lastDate, 'MM/DD/YY').add(1, 'days').format('MM/DD/YY'));
        newCases.push(total?.todayCases);
      }
    }
    const finalLabels = limit ? slicedLabels.slice(slicedLabels?.length - limit) : slicedLabels;
    const finalCases = limit ? newCases.slice(newCases?.length - limit) : newCases;
    return {
      labels: finalLabels,
      cases: finalCases
    };
  }, [data, total])
  
  return (
    <div className="my-3" style={{height: isBrowser ? 450 : 300}}>
     <Chart
        height={isBrowser ? 420 : 300}
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
                enabled: false,
              },
              locales:[
                uzLocale,
                enLocale,
                ruLocale
              ],
              defaultLocale: i18n.language,
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
            tooltip: {
              x: {
                formatter:  function(val, timestamp) {
                  return moment(new Date(val)).format('D MMMM');
                },
              },
            },  
            dataLabels: {
              enabled: true,
              offsetY: -20,
              style: {
                fontSize: '11px',
                colors: ["#304758"],
              },
              formatter (value) {
                return numberWithCommas(value);
              }
            },
            xaxis: {
              // type: 'datetime',
              categories: transformed?.labels || [],
              labels: {
                datetimeUTC: false,
                formatter:  function(val, timestamp) {
                  const date = moment(new Date(val)).format('D.MM');
                  return date;
                }
              }
            },
        }}
        series={[
          {
            name: "Yuqtirganlar",
            data:  transformed?.cases
          },
        ]}
        type="bar"
        width="100%"
      />
    </div>
  )
}

DailyIncreaseChart.defaultProps = {
  limit: null
}

export default DailyIncreaseChart
