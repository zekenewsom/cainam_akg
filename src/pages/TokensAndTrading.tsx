import {
  Copy,
  Globe,
  Twitter,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockTokenData } from '../data/mockTokenData';

const TokensAndTrading = () => {
  const { address } = useParams();
  // In a real app, you'd fetch data based on the address param
  // For this prototype, we'll just use the mock data regardless of the address
  const token = mockTokenData;

  const scoreColor = token.akgReport.trustScore > 75
      ? 'text-green-400'
      : token.akgReport.trustScore > 50
      ? 'text-yellow-400'
      : 'text-red-400';

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
                  {/* In a real app, you'd use an <img /> tag for the logo */}
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
                  <span className='text-2xl font-bold text-white'>{token.header.price}</span>
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

        </div>

        {/* Right Sidebar */}
        <aside className='lg:col-span-1'>
          <div className='bg-gray-800 p-6 rounded-lg sticky top-8'>
            <h2 className='text-xl font-semibold text-white'>Trade Panel</h2>
            <p className='mt-4 text-gray-400'>The buy/sell widget will be implemented here.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TokensAndTrading;
