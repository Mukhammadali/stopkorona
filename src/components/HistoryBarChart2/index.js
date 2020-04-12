import React, { useRef, useEffect, useState } from 'react'
import {  Bar } from "react-chartjs-2"
import queryKeys from 'src/lib/constants/queryKeys';
import { fetchCountryHistorical } from 'src/lib/api';
import { useQuery } from 'react-query';
// import 'chartjs-plugin-crosshair';
import colors from 'src/lib/theme/colors';
import { useCountryHistorical } from 'src/hooks/stats';

const HistoryBarChart2 = () => {
  const {data, status} = useCountryHistorical({countryName: 'Uzbekistan'});
  const [chartData, setChartData] = useState([]);
  console.log('data:', chartData)
  const [href, setHref]=useState("");
  const downloadRef = useRef();
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
   }
  }, [data])
  return (
    <>
      <div>
        <Bar data={chartData} />
      </div>
      </>
  )
}

export default HistoryBarChart2
