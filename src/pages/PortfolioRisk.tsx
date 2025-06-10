import React, { useState } from 'react';
import { Wallet, TestTube2, FileDown, AreaChart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SimpleLineChart from '@/components/SimpleLineChart';
import StatCard from '@/components/StatCard';
import { mockPortfolioData } from '@/data/mockPortfolioData';

type Scenario = typeof mockPortfolioData.stressTestScenarios[0];

export default function PortfolioRisk() {
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
      if (scenario) setScenarioResult(scenario.result);
      setIsLoadingTest(false);
    }, 1000);
  };

  if (!isWalletConnected) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center'>
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
        <h2 className='text-2xl font-bold mb-2'>Connect Your Wallet</h2>
        <p className='text-muted-foreground mb-6 max-w-sm'>Connect your wallet to analyze your portfolio performance, holdings, and risk exposure using our institutional-grade toolset.</p>
        <Button onClick={() => setIsWalletConnected(true)} size="lg">
          <Wallet size={16} className='mr-2' />
          Connect Wallet (Demo)
        </Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 space-y-8'>
      {/* Header */}
      <div className='flex flex-wrap justify-between items-baseline mb-4'>
        <div>
          <h1 className='text-3xl font-bold'>Portfolio & Risk</h1>
          <p className='text-muted-foreground mt-1'>Wallet: 0xAb...Cd (Demo)</p>
        </div>
        <div className='text-right'>
          <p className='text-3xl font-bold'>${data.summary.currentValue.toLocaleString()}</p>
          <p className={`font-medium ${data.summary.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.summary.pnl >= 0 ? '+' : ''}${data.summary.pnl.toLocaleString()} ({data.summary.pnlPercent}%) All Time
          </p>
        </div>
      </div>

      <SimpleLineChart
        title='Portfolio Value (30D)'
        description='Your portfolio value over the last 30 days.'
        data={data.valueHistory.series[0].data}
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {data.riskMetrics.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            subValue={stat.subValue}
          />
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Holdings</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className='text-right'>Quantity</TableHead>
                <TableHead className='text-right'>Price</TableHead>
                <TableHead className='text-right'>Value</TableHead>
                <TableHead className='text-right'>Allocation</TableHead>
                <TableHead className='text-right'>Unrealized P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.holdings.map((h) => (
                <TableRow key={h.asset.ticker}>
                  <TableCell className='font-medium'>{h.asset.name} ({h.asset.ticker})</TableCell>
                  <TableCell className='text-right'>{h.quantity.toLocaleString()}</TableCell>
                  <TableCell className='text-right'>${h.price.toFixed(4)}</TableCell>
                  <TableCell className='text-right font-bold'>${h.value.toLocaleString()}</TableCell>
                  <TableCell className='text-right'>{h.allocation.toFixed(2)}%</TableCell>
                  <TableCell className={`text-right font-medium ${h.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {h.pnl >= 0 ? '+' : ''}${h.pnl.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Stress Testing Simulator</CardTitle>
            <CardDescription>See how your portfolio would perform under different market conditions.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Select onValueChange={setSelectedScenarioId} defaultValue="none">
              <SelectTrigger><SelectValue placeholder="Select a Scenario..." /></SelectTrigger>
              <SelectContent>
                {data.stressTestScenarios.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={runStressTest} disabled={isLoadingTest || selectedScenarioId === 'none'} className='w-full'>
              <TestTube2 size={16} className='mr-2' />
              {isLoadingTest ? 'Calculating...' : 'Run Test'}
            </Button>
            {scenarioResult && (
              <div className='bg-muted p-4 rounded-lg border'>
                <h3 className='font-bold mb-2'>Projected Outcome:</h3>
                <p className='text-sm'>New Value: <span className='font-bold'>${scenarioResult.newValue.toLocaleString()}</span></p>
                <p className='text-sm'>P&L Impact: <span className={`font-bold ${scenarioResult.pnlImpact >=0 ? 'text-green-500' : 'text-red-500'}`}>${scenarioResult.pnlImpact.toLocaleString()} ({scenarioResult.pnlImpactPercent.toFixed(2)}%)</span></p>
                <p className='text-xs text-muted-foreground mt-2'>{scenarioResult.narrative}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax & Compliance</CardTitle>
            <CardDescription>Generate reports for accounting and compliance purposes.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
             <Select defaultValue="2025">
              <SelectTrigger><SelectValue placeholder="Select Tax Year" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
             <Button onClick={() => alert('Generating mock tax report...')} className='w-full'>
              <FileDown size={16} className='mr-2' />
              Generate Tax Report (CSV)
            </Button>
            <div className='text-sm text-muted-foreground border-t pt-4'>
              <h3 className='font-semibold text-foreground mb-1'>Compliance Status</h3>
              <p>✅ All clear - no OFAC-sanctioned addresses in transaction history.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
