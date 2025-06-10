import React from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface SimpleLineChartProps {
  series: { name: string; data: { x: any; y: any }[] }[];
  title: string;
  height?: number;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ series, title, height = 350 }) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: height,
      background: 'transparent',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    theme: {
      mode: 'dark',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: title,
      align: 'left',
      style: { color: '#FFFFFF', fontSize: '16px' }
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toLocaleString(),
      }
    },
    grid: {
      borderColor: '#4A5568',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <ReactApexChart options={options} series={series} type='area' height={height} />
  );
};

export default SimpleLineChart;
