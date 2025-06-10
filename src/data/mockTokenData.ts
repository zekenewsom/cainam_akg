export const mockTokenData = {
  header: {
    name: 'DogWifCat',
    ticker: 'WIFCAT',
    logo: '/cat-logo.png',
    price: 0.045, // Changed to number for calculations
    priceChange: '+12.5%',
    priceChangeType: 'positive' as const,
    contractAddress: 'So11111111111111111111111111111111111111112',
    stats: [
      { label: 'Market Cap', value: '$45M' },
      { label: '24h Volume', value: '$12.3M' },
      { label: 'FDV', value: '$45M' },
    ],
    links: {
      website: '#',
      twitter: '#',
      discord: '#',
      telegram: '#',
    },
  },
  akgReport: {
    trustScore: 72,
    isVerified: true,
    liquidity: {
      isLocked: true,
      details: '95% locked for 1 year',
    },
    redFlags: [
      'High holder concentration: Top wallet holds 40% of supply.',
      'Mint authority not renounced: New tokens can be created.',
    ],
    bullFlags: [
      'Smart Money holds: Tracked by 3 known profitable wallets.',
      'Community engagement is trending upward on Twitter.',
      'Liquidity is locked, reducing rug pull risk.',
    ],
  },
  chartData: [
    { x: new Date(1717650000000), y: [0.035, 0.038, 0.034, 0.037] },
    { x: new Date(1717736400000), y: [0.037, 0.042, 0.036, 0.041] },
    { x: new Date(1717822800000), y: [0.041, 0.043, 0.039, 0.042] },
    { x: new Date(1717909200000), y: [0.042, 0.048, 0.041, 0.045] },
    { x: new Date(1717995600000), y: [0.045, 0.046, 0.043, 0.044] },
    { x: new Date(1718082000000), y: [0.044, 0.045, 0.040, 0.042] },
    { x: new Date(1718168400000), y: [0.042, 0.043, 0.038, 0.039] },
    { x: new Date(1718254800000), y: [0.039, 0.050, 0.039, 0.049] },
    { x: new Date(1718341200000), y: [0.049, 0.052, 0.048, 0.051] },
    { x: new Date(1718427600000), y: [0.051, 0.051, 0.044, 0.045] },
  ],
  orderFlow: {
    recentTrades: [
      { time: '12:05:01', type: 'buy', amount: '1.2M', price: '$0.048', value: '$5.7k', isWhale: false },
      { time: '12:05:00', type: 'sell', amount: '500k', price: '$0.047', value: '$2.3k', isWhale: false },
      { time: '12:04:55', type: 'buy', amount: '10.5M', price: '$0.049', value: '$51.4k', isWhale: true },
      { time: '12:04:52', type: 'buy', amount: '800k', price: '$0.047', value: '$3.7k', isWhale: false },
      { time: '12:04:48', type: 'sell', amount: '2.1M', price: '$0.046', value: '$9.6k', isWhale: false },
    ],
    orderBook: {
      bids: [
        { price: '0.0450', size: '1.5M', total: '1.5M' },
        { price: '0.0448', size: '2.2M', total: '3.7M' },
        { price: '0.0445', size: '3.1M', total: '6.8M' },
      ],
      asks: [
        { price: '0.0452', size: '1.8M', total: '1.8M' },
        { price: '0.0455', size: '2.5M', total: '4.3M' },
        { price: '0.0458', size: '4.0M', total: '8.3M' },
      ]
    }
  },
  holders: {
    stats: {
      total: 15230,
      gini: 0.85,
      giniRemark: 'High Inequality'
    },
    distribution: [
      { name: 'Top 10 Wallets', value: 40 },
      { name: 'Next 100 Wallets', value: 25 },
      { name: 'Other Wallets', value: 35 },
    ],
    topHolders: [
      { address: 'Wallet...A5bC', label: 'Whale #1', holdings: '400M', percentage: '40.0%' },
      { address: 'Wallet...D8eF', label: 'Early Investor', holdings: '50M', percentage: '5.0%' },
      { address: 'Wallet...G1hI', label: 'CEX Hot Wallet', holdings: '45M', percentage: '4.5%' },
    ]
  },
  liquidityPools: [
    { name: 'WIFCAT/SOL', dex: 'Raydium', liquidity: '$1.2M', volume: '$5.6M', apr: '45%' },
    { name: 'WIFCAT/USDC', dex: 'Orca', liquidity: '$800k', volume: '$3.1M', apr: '38%' },
    { name: 'WIFCAT/JUP', dex: 'Jupiter', liquidity: '$500k', volume: '$1.5M', apr: '32%' },
  ],
  user: {
    isWalletConnected: false,
    balances: {
      SOL: 10.5,
      WIFCAT: 50000,
    }
  }
};
