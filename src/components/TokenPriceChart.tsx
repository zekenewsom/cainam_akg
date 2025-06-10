import React from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface TokenPriceChartProps {
  data: { x: Date; y: number[] }[];
}

const TokenPriceChart: React.FC<TokenPriceChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    theme: {
      mode: 'dark',
    },
    title: {
      text: 'Price Chart',
      align: 'left',
      style: {
        color: '#FFFFFF'
      }
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => `<span class=math-inline>\</span>{value.toFixed(4)}`,
      }
    },
    grid: {
      borderColor: '#4A5568', // gray-700
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
    }
  };

  const series = [{
    name: 'candle',
    data: data
  }];

  return (
    <div className='bg-gray-800 p-6 rounded-lg'>
      <ReactApexChart options={options} series={series} type='candlestick' height={350} />
    </div>
  );
};

export default TokenPriceChart;
