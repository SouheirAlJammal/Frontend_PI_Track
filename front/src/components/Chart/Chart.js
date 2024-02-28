import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import style from './Chart.module.css';

const Chart = () => {
  const [currentData, setCurrentData] = useState('daily');

  const dailyData = [15, 50, 18, 90, 30, 65, 80,70, 50, 18, 90, 3,56,67,54,4,4,4,4,4,4,4,4,4];
  const weeklyData = [30, 60, 45, 80, 40, 75, 90];
  const monthlyData = [45, 70, 60, 100, 60, 90, 110, 75, 90, 55, 70, 100];

  const getData = () => {
    switch (currentData) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return [];
    }
  };

  const getCategories = () => {
    switch (currentData) {
      case 'daily':
        return Array.from({ length: 24 }, (_, i) => `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? 'AM' : 'PM'}`);
      case 'weekly':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'monthly':
        return [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      default:
        return [];
    }
  };

  let defaultOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
      width: '100%',
      height: 180,
      offsetY: 18,
    },
    dataLabels: {
      enabled: false,
    },
  };

  let barOptions = {
    ...defaultOptions,
    chart: {
      ...defaultOptions.chart,
      type: 'area',
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: 'Poppins',
      },
      y: {
        formatter: (value) => `${value}Lessons`,
      },
    },
    series: [
      {
        name: 'Lessons',
        data: getData(),
      },
    ],
    colors: ['rgb(226, 17, 157)'],
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            opacity: 0.2,
            color: 'black',
          },
          {
            offset: 100,
            opacity: 0,
            color: 'black',
          },
        ],
      },
    },
    stroke: {
      colors: ['rgb(247, 20, 172)'],
      lineCap: 'round',
    },
    grid: {
      borderColor: 'rgba(0, 0, 0, 0)',
      padding: {
        top: -30,
        right: 0,
        bottom: -8,
        left: 12,
      },
    },
    markers: {
      strokeColors: 'rgb(247, 20, 172)',
    },
    yaxis: {
        show: true, 
        labels: {
          style: {
            colors: 'rgb(7,28,53)',
            fontFamily: 'Poppins',
          },
        },
      },
    xaxis: {
      labels: {
        show: true,
        floating: true,
        style: {
          colors: 'rgb(7,28,53)',
          fontFamily: 'Poppins',
        },
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      categories: getCategories(),
    },
  };

  return (
    <div className={style['chart-area']}>
      <div className={style.filter}>
        <label htmlFor="intervalSelect">Select Interval: </label>
        <select
          id="intervalSelect"
          value={currentData}
          onChange={(e) => setCurrentData(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className={style.grid}></div>
      <ReactApexChart options={barOptions} series={barOptions.series} type="area" height={280} />
    </div>
  );
};

export default Chart;
