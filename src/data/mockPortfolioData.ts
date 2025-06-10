export const mockPortfolioData = {
  summary: {
    currentValue: 55250,
    pnl: 5250,
    pnlPercent: 10.5,
  },
  valueHistory: {
    series: [
      { name: 'Portfolio Value', data: [
        { x: new Date('2025-05-01').getTime(), y: 50000 }, { x: new Date('2025-05-02').getTime(), y: 51000 },
        { x: new Date('2025-05-03').getTime(), y: 50500 }, { x: new Date('2025-05-04').getTime(), y: 52000 },
        { x: new Date('2025-05-05').getTime(), y: 53500 }, { x: new Date('2025-05-06').getTime(), y: 53000 },
        { x: new Date('2025-05-07').getTime(), y: 54500 }, { x: new Date('2025-05-08').getTime(), y: 55250 },
      ]}
    ]
  },
  holdings: [
    {
      asset: { name: 'Solana', ticker: 'SOL' },
      quantity: 100,
      price: 145.80,
      value: 14580,
      allocation: 26.39,
      costBasis: 13000,
      pnl: 1580,
      pnlPercent: 12.15
    },
    {
      asset: { name: 'DogWifCat', ticker: 'WIFCAT' },
      quantity: 500000,
      price: 0.045,
      value: 22500,
      allocation: 40.72,
      costBasis: 15000,
      pnl: 7500,
      pnlPercent: 50.00
    },
    {
      asset: { name: 'Jupiter', ticker: 'JUP' },
      quantity: 8000,
      price: 1.12,
      value: 8960,
      allocation: 16.22,
      costBasis: 9600,
      pnl: -640,
      pnlPercent: -6.67
    },
    {
      asset: { name: 'USDC', ticker: 'USDC' },
      quantity: 9210,
      price: 1.00,
      value: 9210,
      allocation: 16.67,
      costBasis: 9210,
      pnl: 0,
      pnlPercent: 0.00
    },
  ],
  riskMetrics: [
    { label: 'Portfolio Beta', value: '1.20', subValue: 'vs. SOL' },
    { label: 'Sharpe Ratio', value: '1.5', subValue: 'Annualized' },
    { label: 'Monthly Volatility', value: '15.2%', subValue: 'Std. Dev.' },
    { label: 'Max Drawdown', value: '-8.5%', subValue: 'YTD' },
  ],
  stressTestScenarios: [
    { id: 'none', name: 'Select a Scenario...' },
    { 
      id: 'sol_crash', 
      name: 'SOL Market Crash (-30%)',
      result: {
        newValue: 45896,
        pnlImpact: -9354,
        pnlImpactPercent: -16.93,
        narrative: 'A 30% drop in SOL price causes significant losses, partially offset by your stablecoin position.'
      }
    },
    { 
      id: 'alt_winter', 
      name: 'Altcoin Winter (-50%)',
      result: {
        newValue: 36980,
        pnlImpact: -18270,
        pnlImpactPercent: -33.07,
        narrative: 'A 50% drop in non-SOL altcoins heavily impacts the portfolio due to high WIFCAT allocation.'
      }
    },
    { 
      id: 'bull_rally', 
      name: 'Bull Rally (+40%)',
      result: {
        newValue: 77350,
        pnlImpact: 22100,
        pnlImpactPercent: 40.0,
        narrative: 'A broad market rally of 40% would result in substantial gains across the board.'
      }
    }
  ]
};
