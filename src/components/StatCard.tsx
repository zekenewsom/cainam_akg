import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  subValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, changeType, subValue }) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';
  const arrow = changeType === 'positive' ? '↑' : '↓';

  return (
    <div className='bg-gray-800 p-4 rounded-lg'>
      <div className='text-sm text-gray-400'>{label}</div>
      <div className='flex items-baseline space-x-2 mt-1'>
        <div className='text-2xl font-bold text-white'>{value}</div>
        {subValue && <div className={`text-lg ${changeColor}`}>{subValue}</div>}
      </div>
      {change && (
        <div className={`text-sm ${changeColor} mt-1`}>
          {arrow} {change}
        </div>
      )}
    </div>
  );
};

export default StatCard;
