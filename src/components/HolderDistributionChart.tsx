import React from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface HolderDistributionChartProps {
  series: number[];
  labels: string[];
}

const HolderDistributionChart: React.FC<HolderDistributionChartProps> = ({ series, labels }) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    theme: {
      mode: 'dark',
    },
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Supply',
              formatter: () => '1B'
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: false,
    }
  };

  return (
    <ReactApexChart options={options} series={series} type='donut' height={350} />
  );
};

export default HolderDistributionChart;
