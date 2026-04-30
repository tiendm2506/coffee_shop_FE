import React from 'react'
import ReactECharts from 'echarts-for-react'

const LineChart = () => {
  const option = {
    title: {
      text: 'Monthly revenue'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: [120, 200, 150, 80, 70]
      }
    ]
  }
  return (
    <ReactECharts option={option} style={{ height: 400 }} />
  )
}

export default LineChart