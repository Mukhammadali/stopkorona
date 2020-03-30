// import React, { useRef, useEffect, useState } from 'react'
// import Chart from "react-apexcharts";
// import queryKeys from 'src/lib/constants/queryKeys';
// import { fetchCountryHistorical } from 'src/lib/api';
// import { useQuery } from 'react-query';

// const HistoryBarChart3 = () => {
// // var dataURL = chart.dataURI().then(({ imgURI, blob }) => {
// //   var pdf = new jsPDF();
// //   pdf.addImage(imgURI, 'PNG', 0, 0);
// //   pdf.save("download.pdf");
// // })
// const {data, status} = useQuery([queryKeys.COUNTRY_HISTORICAL, { country: 'Italy' }], fetchCountryHistorical);
//   const chartRef = useRef();
//   useEffect(() => {
//     // chartRef.current.dataURI().then(({ imgURI, blob }) => {
//       console.log('chartRef.current:', chartRef.current)
//       // console.log('blob:', blob)
//       // console.log('imgURI:', imgURI)

//     // })
//     const cases = data?.timeline?.cases || {}
//     const deaths = data?.timeline?.deaths || {}
//     const recovered = data?.timeline?.recovered || {}
//   }, [data])
 
  
//   return (
//     <div>
//      <Chart
//         options={{
//             annotations: {
//               position: 'front',
//               yaxis: [{
//                 y: 0,
//               }]
//             },
//             chart: {
//               id: "basic-bar"
//             },
//             stroke: {
//               curve: 'smooth'
//             },
//             dataLabels: {
//               enabled: false
//             },
//             markers: {
//               size: 0,
//               style: 'hollow',
//             },
//             xaxis: {
//               categories: Object.keys(data?.timeline?.cases || {})
//             },
//             selection: 'one_year'
//         }}
//         series={[
//           {
//             name: "Yuqtirganlar",
//             data: Object.values(data?.timeline?.cases || {})
//           },
//           {
//             name: "O'lganlar",
//             data: Object.values(data?.timeline?.deaths || {})
//           },
//           {
//             name: "Tuzalganlar",
//             data: Object.values(data?.timeline?.recovered || {})
//           }
//         ]}
        
//         type="area"
//         width="100%"
//         ref={chartRef}
//       />
//     </div>
//   )
// }

// export default HistoryBarChart3
