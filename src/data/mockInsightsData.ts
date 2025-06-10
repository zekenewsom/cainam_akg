export const mockInsightsData = {
  smartMoneyTrades: [
    { time: '12:10:43', wallet: '0xABCD...EF', walletLabel: 'Fund ABC', action: 'Bought', token: 'WIF', value: '$50,000', type: 'buy' },
    { time: '12:09:15', wallet: '0x1234...56', walletLabel: 'Whale #2', action: 'Sold', token: 'JUP', value: '$120,000', type: 'sell' },
    { time: '12:08:22', wallet: '0xWXYZ...M1', walletLabel: 'Profitable Trader', action: 'Bought', token: 'TNSR', value: '$25,000', type: 'buy' },
    { time: '12:07:01', wallet: '0xABCD...EF', walletLabel: 'Fund ABC', action: 'Sold', token: 'SOL', value: '$250,000', type: 'sell' },
    { time: '12:06:45', wallet: '0x7890...AB', walletLabel: 'Whale #5', action: 'Bought', token: 'WIFCAT', value: '$75,000', type: 'buy' },
  ],
  onChainMetrics: {
    title: 'Solana Daily Active Wallets',
    series: [
      { name: 'Active Wallets', data: [
        { x: new Date('2025-05-01').getTime(), y: 450000 }, { x: new Date('2025-05-02').getTime(), y: 465000 },
        { x: new Date('2025-05-03').getTime(), y: 480000 }, { x: new Date('2025-05-04').getTime(), y: 475000 },
        { x: new Date('2025-05-05').getTime(), y: 510000 }, { x: new Date('2025-05-06').getTime(), y: 525000 },
        { x: new Date('2025-05-07').getTime(), y: 530000 }, { x: new Date('2025-05-08').getTime(), y: 550000 },
      ]}
    ]
  },
  socialSentiment: {
    title: 'WIFCAT Sentiment vs. Price',
    series: [
      { name: 'Price ($)', data: [
        { x: new Date('2025-05-01').getTime(), y: 0.040 }, { x: new Date('2025-05-02').getTime(), y: 0.042 },
        { x: new Date('2025-05-03').getTime(), y: 0.041 }, { x: new Date('2025-05-04').getTime(), y: 0.045 },
        { x: new Date('2025-05-05').getTime(), y: 0.044 }, { x: new Date('2025-05-06').getTime(), y: 0.048 },
        { x: new Date('2025-05-07').getTime(), y: 0.050 }, { x: new Date('2025-05-08').getTime(), y: 0.049 },
      ]},
      { name: 'Sentiment Score', data: [
        { x: new Date('2025-05-01').getTime(), y: 55 }, { x: new Date('2025-05-02').getTime(), y: 60 },
        { x: new Date('2025-05-03').getTime(), y: 65 }, { x: new Date('2025-05-04').getTime(), y: 62 },
        { x: new Date('2025-05-05').getTime(), y: 70 }, { x: new Date('2025-05-06').getTime(), y: 75 },
        { x: new Date('2025-05-07').getTime(), y: 72 }, { x: new Date('2025-05-08').getTime(), y: 68 },
      ]}
    ]
  },
  devActivity: [
    { type: 'dev', project: 'Metaplex', description: 'Pushed 5 commits to core repository.' },
    { type: 'gov', project: 'Jupiter', description: 'New proposal #12 to adjust LFG launchpad fees.' },
    { type: 'gov', project: 'Marinade', description: 'Vote for Q3 grants program has passed.' },
    { type: 'dev', project: 'Drift Protocol', description: 'Released v2.1 with new insurance fund mechanism.' },
  ],
  mlSignals: [
    { type: 'bullish', signal: 'Bullish Divergence: WIFCAT on-chain volume up 50% while price is flat.' },
    { type: 'risk', signal: 'Exchange Inflow Spike: Large amount of JUP moved to CEX.' },
    { type: 'neutral', signal: 'Unusual Social Buzz around a new unverified token "MEOW".' },
    { type: 'bullish', signal: 'Whale Accumulation: 3 known whales bought BONK in last hour.' },
  ]
};
