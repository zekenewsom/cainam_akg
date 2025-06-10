export const mockTokenData = {
  header: {
    name: 'DogWifCat',
    ticker: 'WIFCAT',
    logo: '/cat-logo.png', // We will add a placeholder image later
    price: '/bin/zsh.045',
    priceChange: '+12.5%',
    priceChangeType: 'positive' as const,
    contractAddress: 'So11111111111111111111111111111111111111112',
    stats: [
      { label: 'Market Cap', value: 'M' },
      { label: '24h Volume', value: '.3M' },
      { label: 'FDV', value: 'M' },
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
  // We will add data for the tabs below later
  chartData: [],
  orderFlow: {},
  holders: {},
  liquidityPools: [],
};
