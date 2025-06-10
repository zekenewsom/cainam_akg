import React, { useState, useEffect } from 'react';
import {
  Copy, Globe, Twitter, ShieldCheck, ShieldAlert, ArrowUpRight, MessageCircle, Send, Wallet
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockTokenData } from '../data/mockTokenData';
import TokenPriceChart from '../components/TokenPriceChart';
import HolderDistributionChart from '../components/HolderDistributionChart';

type TokenTab = 'chart' | 'orderflow' | 'holders' | 'liquidity';
type TradeMode = 'buy' | 'sell';

const TokensAndTrading = () => {
  // Page State
  const { address } = useParams();
  const token = mockTokenData;
  const [activeTab, setActiveTab] = useState<TokenTab>('chart');
  
  // Trade Panel State
  const [isWalletConnected, setIsWalletConnected] = useState(token.user.isWalletConnected);
  const [tradeMode, setTradeMode] = useState<TradeMode>('buy');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const priceInSol = token.header.price / 145.80; // Mock SOL price from Overview page

  // Effect to calculate trade amounts
  useEffect(() => {
    if (tradeMode === 'buy') {
      const solAmount = parseFloat(fromAmount);
      if (!isNaN(solAmount)) {
        setToAmount((solAmount / priceInSol).toFixed(2));
      } else {
        setToAmount('');
      }
    } else { // sell mode
      const tokenAmount = parseFloat(fromAmount);
      if (!isNaN(tokenAmount)) {
        setToAmount((tokenAmount * priceInSol).toFixed(4));
      } else {
        setToAmount('');
      }
    }
  }, [fromAmount, tradeMode, priceInSol]);

  const handleSetFromAmount = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) || val === '') {
      setFromAmount(val);
    }
  }

  const handleSetBalance = (percentage: number) => {
    const balance = tradeMode === 'buy' ? token.user.balances.SOL : token.user.balances.WIFCAT;
    handleSetFromAmount((balance * percentage / 100).toString());
  }
  
  const scoreColor = token.akgReport.trustScore > 75 ? 'text-green-400' : token.akgReport.trustScore > 50 ? 'text-yellow-400' : 'text-red-400';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chart':
        return <TokenPriceChart data={token.chartData} />;
      case 'orderflow':
        return (
          <div className='bg-gray-800 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* ... existing orderflow jsx ... */}
            <div>
              <h3 className='font-semibold text-white mb-2'>Order Book</h3>
              <div className='flex justify-between text-xs text-gray-400 px-2 py-1'>
                <span>Price (USD)</span>
                <span>Size ({token.header.ticker})</span>
                <span>Total</span>
              </div>
              <div>
                {token.orderFlow.orderBook.asks.map(ask => (
                  <div key={ask.price} className='flex justify-between items-center text-sm p-1 rounded bg-red-500/10'>
                    <span className='text-red-400 w-1/3'>{ask.price}</span>
                    <span className='w-1/3 text-right'>{ask.size}</span>
                    <span className='w-1/3 text-right'>{ask.total}</span>
                  </div>
                ))}
              </div>
              <div className='text-lg font-bold text-center py-2'>${token.header.price.toFixed(3)}</div>
              <div>
                {token.orderFlow.orderBook.bids.map(bid => (
                   <div key={bid.price} className='flex justify-between items-center text-sm p-1 rounded bg-green-500/10'>
                    <span className='text-green-400 w-1/3'>{bid.price}</span>
                    <span className='w-1/3 text-right'>{bid.size}</span>
                    <span className='w-1/3 text-right'>{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className='font-semibold text-white mb-2'>Recent Trades</h3>
              <div className='space-y-2 max-h-[300px] overflow-y-auto pr-2'>
                {token.orderFlow.recentTrades.map((trade, i) => (
                  <div key={i} className='grid grid-cols-4 gap-2 text-sm'>
                    <span className='text-gray-400'>{trade.time}</span>
                    <span className={`font-bold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{trade.type.toUpperCase()}</span>
                    <span>{trade.amount}</span>
                    <span className='flex items-center gap-1'>{trade.value} {trade.isWhale && '🐳'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'holders':
        return (
           <div className='bg-gray-800 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* ... existing holders jsx ... */}
            <div>
              <h3 className='font-semibold text-white mb-2'>Holder Distribution</h3>
               <HolderDistributionChart series={token.holders.distribution.series} labels={token.holders.distribution.labels} />
            </div>
            <div>
              <div className='mb-4'>
                <h3 className='font-semibold text-white'>Holder Stats</h3>
                <p className='text-sm text-gray-400'>Total Holders: {token.holders.stats.total.toLocaleString()}</p>
                <p className='text-sm text-gray-400'>Gini Coefficient: {token.holders.stats.gini} ({token.holders.stats.giniRemark})</p>
              </div>
              <div>
                <h3 className='font-semibold text-white'>Top Holders</h3>
                <table className='w-full text-left mt-2'>
                  <thead>
                    <tr className='text-gray-400 text-xs'>
                      <th className='p-1'>Address</th>
                      <th className='p-1'>Holdings</th>
                      <th className='p-1'>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {token.holders.topHolders.map(holder => (
                      <tr key={holder.address} className='text-sm'>
                        <td className='p-1 font-mono' title={holder.address}>{holder.label}</td>
                        <td className='p-1'>{holder.holdings}</td>
                        <td className='p-1'>{holder.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'liquidity':
        return (
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h3 className='font-semibold text-white mb-4'>DEX Liquidity Pools</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='border-b border-gray-700 text-gray-400 text-sm'>
                    <th className='p-2'>Pool</th>
                    <th className='p-2'>DEX</th>
                    <th className='p-2'>Liquidity</th>
                    <th className='p-2'>24h Volume</th>
                    <th className='p-2'>APR</th>
                  </tr>
                </thead>
                <tbody>
                  {token.liquidityPools.map((pool) => (
                    <tr key={pool.name} className='border-b border-gray-700/50 text-sm'>
                      <td className='p-3 font-medium'>{pool.name}</td>
                      <td className='p-3'>{pool.dex}</td>
                      <td className='p-3'>{pool.liquidity}</td>
                      <td className='p-3'>{pool.volume}</td>
                      <td className='p-3 text-green-400'>{pool.apr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const TabButton = ({ tabName, label }: { tabName: TokenTab, label: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTab === tabName
          ? 'bg-teal-500 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content Column */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Token Header */}
          <section className='bg-gray-800 p-6 rounded-lg'>
            <div className='flex flex-wrap justify-between items-start gap-4'>
              <div>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-teal-500 rounded-full flex-shrink-0'></div>
                  <div>
                    <h1 className='text-3xl font-bold text-white'>{token.header.name} ({token.header.ticker})</h1>
                    <div className='flex items-center gap-2 text-sm text-gray-400 mt-1'>
                      <span>{token.header.contractAddress.substring(0, 6)}...{token.header.contractAddress.slice(-4)}</span>
                      <button className='hover:text-white'><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 text-gray-300'>
                <a href={token.header.links.website} target='_blank' rel='noreferrer' className='hover:text-white'><Globe size={20} /></a>
                <a href={token.header.links.twitter} target='_blank' rel='noreferrer' className='hover:text-white'><Twitter size={20} /></a>
                <a href={token.header.links.discord} target='_blank' rel='noreferrer' className='hover:text-white'><MessageCircle size={20} /></a>
                <a href={token.header.links.telegram} target='_blank' rel='noreferrer' className='hover:text-white'><Send size={20} /></a>
              </div>
            </div>
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left'>
              <div>
                <div className='text-sm text-gray-400'>Price</div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold text-white'>$${token.header.price.toFixed(3)}</span>
                  <span className='text-green-400 font-medium flex items-center'>
                    <ArrowUpRight size={16} />{token.header.priceChange}
                  </span>
                </div>
              </div>
              {token.header.stats.map(stat => (
                <div key={stat.label}>
                  <div className='text-sm text-gray-400'>{stat.label}</div>
                  <div className='text-xl font-bold text-white'>{stat.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* AKG Security & Insight Report */}
          <section className='bg-gray-800 p-6 rounded-lg border border-teal-500/30'>
            <h2 className='text-xl font-semibold text-white mb-4'>AKG Security & Insight Report</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
              <div className='text-center'>
                <div className='text-sm text-gray-400'>Trust Score</div>
                <div className={`text-5xl font-bold ${scoreColor}`}>{token.akgReport.trustScore}/100</div>
              </div>
              <div className='flex items-center justify-center gap-2'>
                {token.akgReport.isVerified ? <ShieldCheck className='text-green-400' /> : <ShieldAlert className='text-red-400' />}
                <span>Contract Verified</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                {token.akgReport.liquidity.isLocked ? <ShieldCheck className='text-green-400' /> : <ShieldAlert className='text-red-400' />}
                <span>{token.akgReport.liquidity.details}</span>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h3 className='font-semibold text-red-400 mb-2'>Red Flags</h3>
                <ul className='space-y-2'>
                  {token.akgReport.redFlags.map((flag, i) => (
                    <li key={i} className='flex items-start gap-2 text-sm'>
                      <ShieldAlert size={16} className='flex-shrink-0 mt-1 text-red-400' />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-green-400 mb-2'>Bull Flags</h3>
                <ul className='space-y-2'>
                  {token.akgReport.bullFlags.map((flag, i) => (
                    <li key={i} className='flex items-start gap-2 text-sm'>
                      <ShieldCheck size={16} className='flex-shrink-0 mt-1 text-green-400' />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          {/* Main Content Tabs */}
          <section>
            <div className='flex items-center space-x-2 border-b border-gray-700 mb-6'>
              <TabButton tabName='chart' label='Chart' />
              <TabButton tabName='orderflow' label='Order Flow' />
              <TabButton tabName='holders' label='Holders' />
              <TabButton tabName='liquidity' label='Liquidity' />
            </div>
            <div>
              {renderTabContent()}
            </div>
          </section>

        </div>

        {/* Right Sidebar - TRADE PANEL */}
        <aside className='lg:col-span-1'>
          <div className='bg-gray-800 p-6 rounded-lg sticky top-8 space-y-4'>
            {!isWalletConnected ? (
              <button 
                onClick={() => setIsWalletConnected(true)}
                className='w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors'
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            ) : (
              <>
                <div className='grid grid-cols-2 gap-2'>
                  <button onClick={() => setTradeMode('buy')} className={`py-2 rounded-lg ${tradeMode === 'buy' ? 'bg-green-500/80' : 'bg-gray-700 hover:bg-gray-600'}`}>Buy</button>
                  <button onClick={() => setTradeMode('sell')} className={`py-2 rounded-lg ${tradeMode === 'sell' ? 'bg-red-500/80' : 'bg-gray-700 hover:bg-gray-600'}`}>Sell</button>
                </div>
                
                {/* From Input */}
                <div className='bg-gray-900 p-3 rounded-lg'>
                  <div className='flex justify-between items-center text-xs text-gray-400 mb-1'>
                    <span>From</span>
                    <span>Balance: {tradeMode === 'buy' ? `${token.user.balances.SOL.toFixed(2)} SOL` : `${token.user.balances.WIFCAT.toLocaleString()} ${token.header.ticker}`}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <input 
                      type='text' 
                      inputMode='decimal'
                      value={fromAmount}
                      onChange={(e) => handleSetFromAmount(e.target.value)}
                      placeholder='0.0'
                      className='bg-transparent text-2xl w-full focus:outline-none' 
                    />
                    <span className='text-xl font-bold'>{tradeMode === 'buy' ? 'SOL' : token.header.ticker}</span>
                  </div>
                  <div className='flex justify-end space-x-2 mt-1'>
                    {[25, 50, 75, 100].map(p => (
                       <button key={p} onClick={() => handleSetBalance(p)} className='text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded'>{p}%</button>
                    ))}
                  </div>
                </div>

                {/* To Input */}
                <div className='bg-gray-900 p-3 rounded-lg'>
                  <div className='text-xs text-gray-400 mb-1'>To (Estimated)</div>
                  <div className='flex justify-between items-center'>
                    <input 
                      type='text'
                      value={toAmount}
                      readOnly
                      placeholder='0.0'
                      className='bg-transparent text-2xl w-full focus:outline-none text-gray-400' 
                    />
                    <span className='text-xl font-bold'>{tradeMode === 'buy' ? token.header.ticker : 'SOL'}</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Trade Submitted!')}
                  className={`w-full font-bold py-3 rounded-lg transition-colors ${tradeMode === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {tradeMode === 'buy' ? `Buy ${token.header.ticker}` : `Sell ${token.header.ticker}`}
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TokensAndTrading;
