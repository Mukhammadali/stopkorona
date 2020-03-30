import React, { useRef, useEffect, useState } from 'react'
import Chart from "chart.js";
import { Line } from "react-chartjs-2"
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical } from 'src/lib/api';
import { useQuery } from 'react-query';
import colors from 'src/lib/theme/colors';
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = '#07C';
         ctx.stroke();
         ctx.restore();
      }
   }
});

const HistoryBarChart2 = () => {
  const {data, status} = useQuery([queryKeys.COUNTRY_HISTORICAL, { country: 'Italy' }], fetchCountryHistorical);
  console.log('data:', data)
  console.log('status:', status)
  const [chartData, setChartData] = useState([]);
  const [href, setHref]=useState("");
  const downloadRef = useRef();
  const chartRef = useRef();
  const chartRef2 = useRef();
  const createChart = () => {
      const myChartRef = chartRef.current?.getContext("2d");
      const myChartRef2 = chartRef2.current?.getContext("2d");
      new Chart(myChartRef, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            yAxes: [{
              display:'Awesome',
              stacked: true
              // gridLines: {
              //   color: 'red'
              // }
            }],
            xAxes: [{
              display:'Awesome',
              gridLines: {
                // stacked: true,
                display: false
                
              }
            }]
        },
          title:'Test',
          tooltips: {
            borderWidth: 10,
            intersect: false,
            mode: 'x'
          }
        }
    });
    new Chart(myChartRef2, {
      type: "line",
      data: chartData,
      options: {
        plugins: {
          crosshair: {
            sync: {
              enabled: false
            }
          }
        },

        tooltips: {
          mode: "interpolate",
          intersect: false,
          callbacks: {
            title: function(a, d) {
              return a[0].xLabel.toFixed(2);
            },
            label: function(i, d) {
              return (
                d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
              );
            }
          }
        }
      },
  });
  }
  useEffect(() => {
    if(data?.timeline){
    const cases = data?.timeline?.cases || {}
    const deaths = data?.timeline?.deaths || {}
    const recovered = data?.timeline?.recovered || {}
    const casesArr = Object.values(cases);
    const firstNonZeroNumIndex = casesArr.findIndex(el => el > 0);
    const labels = Object.keys(cases).slice(firstNonZeroNumIndex);
    const infectedData = casesArr.slice(firstNonZeroNumIndex)
    const diedData = Object.values(deaths).slice(firstNonZeroNumIndex)
    const recoveredData = Object.values(recovered).slice(firstNonZeroNumIndex)
    setChartData({
      labels,
      datasets: [
        {
          label: "O'lganlar",
          data: diedData,
          stack: "stack",
          backgroundColor: colors.died,
        },
        {
          label: "Tuzalganlar",
          data: recoveredData,
          stack: "stack",
          backgroundColor: colors.recovered,
        },
        {
          label: "Yuqtirganlar",
          data: infectedData,
          stack: "stack",
          backgroundColor: colors.infected,
        },
      ]
  })
  createChart();
   }
  }, [data])

  const onDownload = () => {
      /*Get image of canvas element*/
      const url_base64jp = chartRef.current.toDataURL("image/jpg");
      console.log('url_base64jp:', url_base64jp)
      setHref(url_base64jp)
      downloadRef.current.click();
  }
        
  
  return (
    <>
    <div>
      <canvas
        id="myChart"
        ref={chartRef}
      />
      <a
        id="download"
        download="ChartImage.jpg" 
        href={href}
        title="Descargar Gráfico"
        ref={downloadRef}
      />
      <button onClick={onDownload}>Download</button>
    </div>
      <div>
      <canvas
        id="myChart2"
        ref={chartRef2}
      />
      </div>
      </>
  )
}

export default HistoryBarChart2
