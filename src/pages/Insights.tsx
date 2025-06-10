import React from 'react';
import { mockInsightsData } from '../data/mockInsightsData';
import SimpleLineChart from '../components/SimpleLineChart';
import { GitCommit, Vote, Bot, AlertTriangle } from 'lucide-react';

const Insights = () => {
  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'bullish': return <Bot className='text-green-400' size={20} />;
      case 'risk': return <AlertTriangle className='text-red-400' size={20} />;
      default: return <Bot className='text-yellow-400' size={20} />;
    }
  };

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 space-y-8'>
      <header>
        <h1 className='text-3xl font-bold'>Analytics Workbench</h1>
        <p className='text-gray-400 mt-1'>Generate high-conviction ideas from on-chain, social, and developer insights.</p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Column */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Smart Money Tracker */}
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold text-white mb-4'>🧠 Smart Money Live Trades</h2>
            <div className='overflow-x-auto max-h-[350px] overflow-y-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='border-b border-gray-700 text-gray-400 text-sm'>
                    <th className='p-2'>Time</th>
                    <th className='p-2'>Wallet</th>
                    <th className='p-2'>Action</th>
                    <th className='p-2'>Token</th>
                    <th className='p-2 text-right'>Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInsightsData.smartMoneyTrades.map((trade, i) => (
                    <tr key={i} className='border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors text-sm'>
                      <td className='p-3 text-gray-400'>{trade.time}</td>
                      <td className='p-3 font-medium' title={trade.wallet}>{trade.walletLabel}</td>
                      <td className={`p-3 font-bold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{trade.action}</td>
                      <td className='p-3 font-bold'>{trade.token}</td>
                      <td className='p-3 text-right'>{trade.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Social Sentiment Trends */}
          <div className='bg-gray-800 p-6 rounded-lg'>
             <SimpleLineChart 
              title={mockInsightsData.socialSentiment.title}
              series={mockInsightsData.socialSentiment.series}
              height={250}
            />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className='lg:col-span-1 space-y-8'>
          {/* On-Chain Metrics Explorer */}
          <div className='bg-gray-800 p-6 rounded-lg'>
            <SimpleLineChart 
              title={mockInsightsData.onChainMetrics.title}
              series={mockInsightsData.onChainMetrics.series}
              height={250}
            />
          </div>

          {/* Dev/Gov Activity Tracker */}
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold text-white mb-4'>Dev & Gov Activity</h2>
            <ul className='space-y-4'>
              {mockInsightsData.devActivity.map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                  <div className='bg-gray-700 p-2 rounded-full'>
                    {item.type === 'dev' ? <GitCommit size={16}/> : <Vote size={16} />}
                  </div>
                  <div>
                    <p className='text-sm font-medium'>{item.description}</p>
                    <p className='text-xs text-gray-400'>{item.project}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ML Signal Feed */}
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h2 className='text-xl font-semibold text-white mb-4'>🤖 ML Signal Feed</h2>
            <ul className='space-y-4'>
              {mockInsightsData.mlSignals.map((item, i) => (
                <li key={i} className='flex items-start gap-3'>
                   <div className='p-2'>
                    {getSignalIcon(item.type)}
                  </div>
                  <div>
                    <p className='text-sm'>{item.signal}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
