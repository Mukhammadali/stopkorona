import React, { useRef, useMemo, memo } from 'react'
import Chart from "react-apexcharts";
import moment from "moment";
import { numberWithCommas } from 'src/lib/utils'

import { isBrowser } from 'react-device-detect';
import { uzLocale } from 'src/lib/config/apexCharts'
import ruLocale from 'apexcharts/dist/locales/ru.json'
import enLocale from 'apexcharts/dist/locales/en.json'
import { useTranslation } from 'react-i18next';

const TotalCasesChart = ({ data, total }) => {
  const { i18n } = useTranslation()
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
    const slicedCases = Object.values(data?.cases).slice(lastLeadingZeroIndex).map((el, idx) => [slicedLabels[idx], el]);
    const slicedRecovered = Object.values(data?.recovered).slice(lastLeadingZeroIndex).map((el, idx) => [slicedLabels[idx], el]);
    const slicedDeaths = Object.values(data?.deaths).slice(lastLeadingZeroIndex).map((el, idx) => [slicedLabels[idx], el]);
    if (total) {
      const lastDate = slicedLabels[slicedLabels.length - 1];
      const latestDate = moment(total?.updated, 'x').format('MM/DD/YY');
      const today = moment().format('MM/DD/YY');
      if(lastDate !== latestDate){
        const lastCase = slicedCases[slicedCases.length - 1];
        const timestamp = moment(lastDate, 'MM/DD/YY').add(1, 'days').format('MM/DD/YY')
        if(lastCase[1] <= total?.cases){
          slicedLabels.push(timestamp);
          slicedCases.push([timestamp, total?.cases]);
          slicedRecovered.push([timestamp,total?.recovered]);
          slicedDeaths.push([timestamp, total?.deaths]);
        } else {
          slicedLabels.push(timestamp);
          slicedCases.push([timestamp, data.cases[lastDate]]);
          slicedRecovered.push([timestamp, data.recovered[lastDate]]);
          slicedDeaths.push([timestamp, data.deaths[lastDate]]);
        }
      }
    }
    return {
      cases:slicedCases ,
      recovered: slicedRecovered,
      deaths: slicedDeaths
    };
  }, [data, total])
  
  return (
    <div className="my-3 no-webkit-scroll" style={{height: isBrowser ? 450 : 'auto', overlowY: 'hidden'}}>
      {/* <div>
        <button>Hammasi</button>
        <button>1 Oylik</button>
        <button>3 Oylik</button>
    </div> */}
     <Chart
        height={isBrowser ? 420 : 'auto'}
        options={{
            colors: ['#2E93fA', '#66DA26', 'rgb(113, 128, 150)', '#E91E63', '#FF9800'],
            legend: {
              position: 'top'
            },
            tooltip: {
              x: {
                format: "d MMMM"
              },
            },      
            annotations: {
              position: 'front',
              yaxis: [{
                y: 0,
              }],
            },
            chart: {
              height: 350,
              animations: {
                  enabled: false,
                  // easing: 'easeinout',
                  // speed: 100,
                  animateGradually: {
                      enabled: false,
                      // delay: 100
                  },
                  dynamicAnimation: {
                      enabled: false,
                      // speed: 100
                  }
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
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            xaxis: {
              type: 'datetime',
              // categories: Object.keys(data?.cases || {}),
              // tickAmount: 10,
              tickAmount: 10,
              // min: new Date("2 Mar 2020").getTime(),
              // max: moment().subtract(1, 'd').valueOf(),
              // format: 'dd MMMM'
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
            },
            // selection: 'one_year',
        }}
        series={[
          {
            name: "Yuqtirganlar",
            data:  transformed?.cases
          },
          {
            name: "Tuzalganlar",
            data: transformed?.recovered
          },
          {
            name: "Vafot Etganlar",
            data: transformed?.deaths
          },
        ]}
        type="area"
        width="100%"
      />
    </div>
  )
}

export default memo(TotalCasesChart)
