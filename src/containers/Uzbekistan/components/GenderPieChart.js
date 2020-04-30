import React from 'react'
import { Pie } from 'react-chartjs-2'
const data = {
	labels: [
		'Erkaklar',
		'Ayollar',
	],
	datasets: [{
		data: [300, 50],
		backgroundColor: [
    '#36A2EB',
		'#FF6384',
		],
		hoverBackgroundColor: [
    '#36A2EB',
		'#FF6384',
		]
	}]
};


const GenderPieChart = () => {
  return (
    <div>
      <Pie
        data={data}
        options={{
          tooltips: {
            enabled: false
          },
          legend: {
            display: true
          },
          
        }}
      />
    </div>
  )
}

export default GenderPieChart
