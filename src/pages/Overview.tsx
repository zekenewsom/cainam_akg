import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { mockOverviewData } from '../data/mockOverviewData';

type MoverTab = 'gainers' | 'losers';

const Overview = () => {
  const [activeMoverTab, setActiveMoverTab] = useState<MoverTab>('gainers');
  const moversToShow = mockOverviewData.spotMovers[activeMoverTab];

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 space-y-8'>
      {/* Section 1: Market Vitals Header */}
      <section>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {mockOverviewData.marketVitals.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              subValue={stat.subValue}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Hot Contracts & Trending Narratives */}
      <section>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold text-white mb-4'>🔥 Hot Contracts</h2>
            <ul className='space-y-3'>
              {mockOverviewData.hotContracts.map((contract) => (
                <li key={contract.name} className='flex justify-between items-center bg-gray-700/50 p-3 rounded-md'>
                  <span className='font-bold text-white'>{contract.name}</span>
                  <span className='text-sm text-gray-300'>{contract.momentum}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold text-white mb-4'>📈 Trending Narratives</h2>
            <ul className='space-y-3'>
              {mockOverviewData.trendingNarratives.map((narrative) => (
                <li key={narrative.name} className='flex justify-between items-center bg-gray-700/50 p-3 rounded-md'>
                  <span className='font-bold text-white'>{narrative.name}</span>
                  <span className='text-sm text-gray-300'>{narrative.metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Spot Market Movers */}
      <section className='bg-gray-800 p-6 rounded-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-white'>Spot Market Movers</h2>
          <div className='flex space-x-2 bg-gray-700 rounded-lg p-1'>
            <button onClick={() => setActiveMoverTab('gainers')} className={`px-3 py-1 text-sm rounded-md ${activeMoverTab === 'gainers' ? 'bg-green-500 text-white' : 'text-gray-300'}`}>Top Gainers</button>
            <button onClick={() => setActiveMoverTab('losers')} className={`px-3 py-1 text-sm rounded-md ${activeMoverTab === 'losers' ? 'bg-red-500 text-white' : 'text-gray-300'}`}>Top Losers</button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-gray-700 text-gray-400 text-sm'>
                <th className='p-2'>Token</th>
                <th className='p-2'>Price</th>
                <th className='p-2'>24h Change</th>
                <th className='p-2'>Volume</th>
                <th className='p-2'>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {moversToShow.map((token) => (
                <tr key={token.address} className='border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors'>
                  <td className='p-3 font-medium'><Link to={`/token/${token.address}`} className='hover:underline'>{token.name}</Link></td>
                  <td className='p-3'>{token.price}</td>
                  <td className={`p-3 ${activeMoverTab === 'gainers' ? 'text-green-400' : 'text-red-400'}`}>{token.change}</td>
                  <td className='p-3'>{token.volume}</td>
                  <td className='p-3'>{token.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Derivatives Market Summary */}
      <section>
        <h2 className='text-xl font-semibold text-white mb-4'>Derivatives Market Summary</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {mockOverviewData.derivativesSummary.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              subValue={stat.subValue}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Overview;
