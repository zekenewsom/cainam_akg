import React, { useState } from 'react';
import { mockPortfolioData } from '../data/mockPortfolioData';
import SimpleLineChart from '../components/SimpleLineChart';
import StatCard from '../components/StatCard';
import { Wallet, TestTube2, FileDown } from 'lucide-react';

type Scenario = typeof mockPortfolioData.stressTestScenarios[0];

const PortfolioRisk = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState('none');
  const [scenarioResult, setScenarioResult] = useState<Scenario['result'] | null>(null);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const data = mockPortfolioData;

  const runStressTest = () => {
    if (selectedScenarioId === 'none') {
      setScenarioResult(null);
      return;
    }
    setIsLoadingTest(true);
    setScenarioResult(null);
    setTimeout(() => {
      const scenario = data.stressTestScenarios.find(s => s.id === selectedScenarioId);
      if (scenario) {
        setScenarioResult(scenario.result);
      }
      setIsLoadingTest(false);
    }, 1000); // Simulate network/calculation delay
  };

  if (!isWalletConnected) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-8rem)]'>
        <h2 className='text-2xl font-bold mb-4'>Connect Your Wallet</h2>
        <p className='text-gray-400 mb-8'>Connect your wallet to analyze your portfolio performance and risk.</p>
        <button
          onClick={() => setIsWalletConnected(true)}
          className='w-64 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors'
        >
          <Wallet size={20} />
          Connect Wallet (Demo)
        </button>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 space-y-8'>
      {/* Section 1: Portfolio Performance & Allocation */}
      <section className='bg-gray-800 p-6 rounded-lg'>
        <div className='flex flex-wrap justify-between items-baseline mb-4'>
          <div>
            <h2 className='text-xl font-semibold text-white'>Portfolio Performance</h2>
            <p className='text-gray-400 text-sm'>Wallet: 0xAb...Cd (Demo)</p>
          </div>
          <div className='text-right'>
            <p className='text-3xl font-bold'>${data.summary.currentValue.toLocaleString()}</p>
            <p className={data.summary.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
              {data.summary.pnl >= 0 ? '+' : ''}${data.summary.pnl.toLocaleString()} ({data.summary.pnlPercent}%) All Time
            </p>
          </div>
        </div>
        <SimpleLineChart
          title='Portfolio Value (30D)'
          series={data.valueHistory.series}
          height={250}
        />
      </section>

      {/* Holdings Table */}
      <section className='bg-gray-800 p-6 rounded-lg'>
        <h2 className='text-xl font-semibold text-white mb-4'>Holdings</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-gray-700 text-gray-400 text-sm'>
                <th className='p-2'>Asset</th>
                <th className='p-2 text-right'>Quantity</th>
                <th className='p-2 text-right'>Price</th>
                <th className='p-2 text-right'>Value</th>
                <th className='p-2 text-right'>Allocation</th>
                <th className='p-2 text-right'>Unrealized P&L</th>
              </tr>
            </thead>
            <tbody>
              {data.holdings.map((h) => (
                <tr key={h.asset.ticker} className='border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors text-sm'>
                  <td className='p-3 font-medium'>{h.asset.name} ({h.asset.ticker})</td>
                  <td className='p-3 text-right'>{h.quantity.toLocaleString()}</td>
                  <td className='p-3 text-right'>${h.price.toFixed(4)}</td>
                  <td className='p-3 text-right font-bold'>${h.value.toLocaleString()}</td>
                  <td className='p-3 text-right'>{h.allocation.toFixed(2)}%</td>
                  <td className={`p-3 text-right font-medium ${h.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {h.pnl >= 0 ? '+' : ''}${h.pnl.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Risk Analysis Dashboard */}
      <section>
        <h2 className='text-xl font-semibold text-white mb-4'>Risk Metrics</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {data.riskMetrics.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              subValue={stat.subValue}
            />
          ))}
        </div>
      </section>

      {/* Section 3 & 4: Tools */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Stress Testing Simulator */}
        <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-white mb-4'>Stress Testing Simulator</h2>
          <div className='space-y-4'>
            <select 
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none'
            >
              {data.stressTestScenarios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button 
              onClick={runStressTest}
              disabled={isLoadingTest || selectedScenarioId === 'none'}
              className='w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600'
            >
              <TestTube2 size={20} />
              Run Test
            </button>
            {isLoadingTest && <p className='text-center text-gray-400'>Calculating...</p>}
            {scenarioResult && (
              <div className='bg-gray-900/50 p-4 rounded-lg'>
                <h3 className='font-bold'>Projected Outcome:</h3>
                <p>New Value: <span className='font-bold'>${scenarioResult.newValue.toLocaleString()}</span></p>
                <p>P&L Impact: <span className={`font-bold ${scenarioResult.pnlImpact >=0 ? 'text-green-400' : 'text-red-400'}`}>${scenarioResult.pnlImpact.toLocaleString()} ({scenarioResult.pnlImpactPercent.toFixed(2)}%)</span></p>
                <p className='text-sm text-gray-400 mt-2'>{scenarioResult.narrative}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tax & Compliance Reporting */}
         <div className='bg-gray-800 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-white mb-4'>Tax & Compliance</h2>
          <div className='space-y-4'>
            <div>
              <label className='text-sm text-gray-400'>Select Tax Year</label>
              <select className='w-full mt-1 p-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none'>
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>
             <button 
              onClick={() => alert('Generating mock tax report...')}
              className='w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors'
            >
              <FileDown size={20} />
              Generate Tax Report (CSV)
            </button>
            <div className='text-sm text-gray-400 border-t border-gray-700 pt-4'>
              <h3 className='font-semibold text-white'>Compliance</h3>
              <p>✅ All clear - no OFAC-sanctioned addresses in transaction history.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PortfolioRisk;
