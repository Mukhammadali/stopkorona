import React, { useRef, useEffect, useState } from 'react'
import Chart from "react-apexcharts";

import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical, fetchAllHistorical } from 'src/lib/api';
import { useQuery } from 'react-query';
import { numberWithCommas } from 'src/lib/utils';
import { useMemo } from 'react';
import { isBrowser } from 'react-device-detect';
const uzLocale = {
  "name": "uz",
  "options": {
    "months": ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    "shortMonths": ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"],
    "days": ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
    "shortDays": ["Ya", "Du", "Se", "Cho", "Pa", "Ju", "Sha"],
    "toolbar": {
        "exportToSVG": "Download SVG",
        "exportToPNG": "Download PNG",
        "menu": "Menu",
        "selection": "Selection",
        "selectionZoom": "Selection Zoom",
        "zoomIn": "Zoom In",
        "zoomOut": "Zoom Out",
        "pan": "Panning",
        "reset": "Reset Zoom"
    }
  }
}

const HistoryBarChart3 = () => {
  const [] = useState();
  const { data, status } = useQuery(queryKeys.ALL_HISTORICAL, fetchAllHistorical, {
    refetchOnWindowFocus: false
  });
  const [image, setImage] = useState(null)
  const chartRef = useRef();
  useEffect(() => {
    console.log('MOUNTED')
    // if(chartRef.current?.chart) {
    //   chartRef.current.chart.dataURI().then(({ imgURI, blob }) => {
    //     console.log('imgURI:', imgURI)
    //     setImage(imgURI);
    //     // console.log('blob:', blob)
    //     // console.log('imgURI:', imgURI)
    return () => {
      console.log('UNMOUNTED');
    }
  }, [])
 
  // const cases = useMemo(() => {
  //   if(!data?.cases) return {
  //     values: [],
  //     keys: []
  //   };
  //   const values = [];
  //   const keys = [];
  //   Object.keys(data?.cases)?.forEach(el => {
  //     const parsed = el?.split('/');
  //     values.push(data?.cases[el]);
  //     keys.push([parsed[1],parsed[0], parsed[2]].join('/'));
  //   });
  //   return {
  //     values,
  //     keys
  //   }
  // }, [data?.cases])
  // console.log('cases:', cases)
  
  return useMemo( () => (
    <div className="my-3" style={{height: isBrowser ? 450 : 'auto'}}>
      {/* <div>
        <button>Hammasi</button>
        <button>1 Oylik</button>
        <button>3 Oylik</button>
    </div> */}
     <Chart
        height={isBrowser ? 450 : 'auto'}
        options={{
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
                  enabled: true,
                  // easing: 'easeinout',
                  // speed: 100,
                  animateGradually: {
                      enabled: true,
                      // delay: 100
                  },
                  dynamicAnimation: {
                      enabled: true,
                      // speed: 100
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
              categories: Object.keys(data?.cases || {}),
              // tickAmount: 10,
              tickAmount: 10,
              // min: new Date("2 Mar 2020").getTime(),
              max: new Date().getTime(),
              // format: 'dd MMMM'
              labels: {
                format: 'd MMMM',
                datetimeFormatter: {
                  year: 'yyyy',
                  month: "d MMMM",
                  day: 'd MMMM',
                  hour: 'HH:mm',
                },
              }
              // range: 20
            },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return numberWithCommas(value);
                }
              },
              // max: Object.values(data?.cases || {}).pop()
            },
            // selection: 'one_year',
        }}
        series={[
          {
            name: "Yuqtirganlar",
            data:  Object.values(data?.cases || {})
          },
          {
            name: "Tuzalganlar",
            data: Object.values(data?.recovered || {})
          },
          {
            name: "Vafot Etganlar",
            data: Object.values(data?.deaths || {})
          },
        ]}
        type="area"
        width="100%"
        ref={chartRef}
      />
    </div>
  ), [data])
}

export default HistoryBarChart3
