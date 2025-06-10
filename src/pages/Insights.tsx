import React from 'react';
import { mockInsightsData } from '@/data/mockInsightsData';
import SimpleLineChart from '@/components/SimpleLineChart';
import { GitCommit, Vote, Bot, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Insights() {
  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'bullish': return <Bot className='text-green-500' size={20} />;
      case 'risk': return <AlertTriangle className='text-red-500' size={20} />;
      default: return <Bot className='text-yellow-500' size={20} />;
    }
  };

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 space-y-8'>
      <header>
        <h1 className='text-3xl font-bold'>Analytics Workbench</h1>
        <p className='text-muted-foreground mt-1'>Generate high-conviction ideas from on-chain, social, and developer insights.</p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Column */}
        <div className='lg:col-span-2 space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>🧠 Smart Money Live Trades</CardTitle>
              <CardDescription>Live feed of transactions from wallets identified as profitable or influential.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead className='text-right'>Value (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsightsData.smartMoneyTrades.map((trade, i) => (
                    <TableRow key={i}>
                      <TableCell className='text-muted-foreground'>{trade.time}</TableCell>
                      <TableCell className='font-medium' title={trade.wallet}>{trade.walletLabel}</TableCell>
                      <TableCell className={`font-bold ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.action}</TableCell>
                      <TableCell className='font-bold'>{trade.token}</TableCell>
                      <TableCell className='text-right'>{trade.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <SimpleLineChart
            title={mockInsightsData.socialSentiment.title}
            description="Comparing social media sentiment score against the token's price action."
            data={mockInsightsData.socialSentiment.series.find(s => s.name === 'Price ($)')!.data} // Just showing price for simplicity
          />
        </div>

        {/* Sidebar Column */}
        <div className='lg:col-span-1 space-y-8'>
          <SimpleLineChart
            title={mockInsightsData.onChainMetrics.title}
            description="Key health metrics for the entire Solana network."
            data={mockInsightsData.onChainMetrics.series[0].data}
            yAxisLabel=""
          />

          <Card>
            <CardHeader>
              <CardTitle>Dev & Gov Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4'>
                {mockInsightsData.devActivity.map((item, i) => (
                  <li key={i} className='flex items-start gap-3'>
                    <div className='bg-muted p-2 rounded-full mt-1'>
                      {item.type === 'dev' ? <GitCommit size={16}/> : <Vote size={16} />}
                    </div>
                    <div>
                      <p className='text-sm font-medium'>{item.description}</p>
                      <p className='text-xs text-muted-foreground'>{item.project}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🤖 ML Signal Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4'>
                {mockInsightsData.mlSignals.map((item, i) => (
                  <li key={i} className='flex items-start gap-3'>
                    <div className='mt-1'>
                      {getSignalIcon(item.type)}
                    </div>
                    <p className='text-sm'>{item.signal}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
