export const mockOverviewData = {
  marketVitals: [
    { label: 'SOL Price', value: '$145.80', change: '+2.5%', changeType: 'positive' as const, sparklineData: [50, 52, 51, 53, 55, 54, 56] },
    { label: 'Solana Market Cap', value: '$67.2B', change: '+3.1%', changeType: 'positive' as const, sparklineData: [65, 66, 65, 67, 68, 67, 69] },
    { label: '24h Volume', value: '$2.1B', change: '-5.7%', changeType: 'negative' as const, sparklineData: [2.5, 2.4, 2.6, 2.3, 2.2, 2.4, 2.1] },
    { label: 'Network TPS', value: '2,890', change: '+1.2%', changeType: 'positive' as const, sparklineData: [2800, 2850, 2820, 2880, 2900, 2890, 2890] },
    { label: 'AKG Sentiment', value: '72', subValue: 'Bullish', changeType: 'positive' as const, sparklineData: [60, 65, 62, 68, 70, 75, 72] },
  ],
  hotContracts: [
    { name: 'WIF', momentum: '🚀 High Activity' },
    { name: 'BONK', momentum: '📈 Gaining Traction' },
    { name: 'JUP', momentum: '🔥 Hot' },
    { name: 'TNSR', momentum: '🚀 High Activity' },
    { name: 'WEN', momentum: '📈 Gaining Traction' },
  ],
  trendingNarratives: [
    { name: 'AI Tokens', metric: 'Vol: $15M, +18%' },
    { name: 'DePIN', metric: 'Vol: $12M, +5%' },
    { name: 'Memecoins', metric: 'Vol: $55M, +25%' },
    { name: 'Solana DeFi', metric: 'Vol: $30M, +12%' },
    { name: 'Gaming', metric: 'Vol: $8M, -2%' },
  ],
  spotMovers: {
    gainers: [
      { address: 'So11111111111111111111111111111111111111112', name: 'SILLY', price: '$0.025', change: '+152%', volume: '$5.2M', marketCap: '$25M' },
      { address: 'So11111111111111111111111111111111111111113', name: 'ANALOS', price: '$0.0006', change: '+88%', volume: '$12.1M', marketCap: '$60M' },
      { address: 'So11111111111111111111111111111111111111114', name: 'POPCAT', price: '$0.45', change: '+65%', volume: '$30M', marketCap: '$440M' },
      { address: 'So11111111111111111111111111111111111111115', name: 'MANEKI', price: '$0.01', change: '+42%', volume: '$8.5M', marketCap: '$90M' },
    ],
    losers: [
      { address: 'So11111111111111111111111111111111111111116', name: 'GME', price: '$0.008', change: '-45%', volume: '$60M', marketCap: '$55M' },
      { address: 'So11111111111111111111111111111111111111117', name: 'AMC', price: '$0.0001', change: '-32%', volume: '$4.1M', marketCap: '$1M' },
      { address: 'So11111111111111111111111111111111111111118', name: 'ROARING KITTY', price: '$0.015', change: '-28%', volume: '$15M', marketCap: '$150M' },
      { address: 'So11111111111111111111111111111111111111119', name: 'WOOF', price: '$0.00008', change: '-15%', volume: '$1.2M', marketCap: '$8M' },
    ]
  },
  derivativesSummary: [
    { label: 'Total Open Interest', value: '$1.5B', change: '+8.2%', changeType: 'positive' as const, sparklineData: [1.2, 1.3, 1.25, 1.4, 1.45, 1.4, 1.5] },
    { label: 'Avg. Funding Rate', value: '-0.015%', change: 'Shorts Paying', changeType: 'negative' as const, sparklineData: [0.01, 0.01, -0.005, -0.01, -0.012, -0.018, -0.015] },
    { label: '24h Liquidations', value: '$25.6M', subValue: 'Longs: $18M', changeType: 'negative' as const, sparklineData: [10, 15, 12, 20, 18, 28, 25.6] },
    { label: 'Top Perp Exchange', value: 'Drift', subValue: '$500M Volume', changeType: 'positive' as const, sparklineData: [400, 420, 410, 450, 480, 490, 500] },
  ]
};
