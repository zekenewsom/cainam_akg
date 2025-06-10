import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, Globe, Twitter, ShieldCheck, ShieldAlert, ArrowUpRight, MessageCircle, Send, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { mockTokenData } from '@/data/mockTokenData';
import TokenPriceChart from '@/components/TokenPriceChart';
import HolderDistributionChart from '@/components/HolderDistributionChart';

type TradeMode = 'buy' | 'sell';

export default function TokensAndTrading() {
  const { address } = useParams();
  const token = mockTokenData;

  // Trade Panel State
  const [isWalletConnected, setIsWalletConnected] = useState(token.user.isWalletConnected);
  const [tradeMode, setTradeMode] = useState<TradeMode>('buy');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const priceInSol = token.header.price / 145.80;

  useEffect(() => {
    if (tradeMode === 'buy') {
      const solAmount = parseFloat(fromAmount);
      if (!isNaN(solAmount)) setToAmount((solAmount / priceInSol).toFixed(2));
      else setToAmount('');
    } else {
      const tokenAmount = parseFloat(fromAmount);
      if (!isNaN(tokenAmount)) setToAmount((tokenAmount * priceInSol).toFixed(4));
      else setToAmount('');
    }
  }, [fromAmount, tradeMode, priceInSol]);

  const scoreColor = token.akgReport.trustScore > 75 ? 'text-green-500' : token.akgReport.trustScore > 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content Column */}
        <div className='lg:col-span-2 space-y-8'>
          <TokenHeader />
          <AkgReport />
          <TokenDataTabs />
        </div>
        {/* Right Sidebar */}
        <aside className='lg:col-span-1'>
          <div className='sticky top-8'>
            <TradePanel />
          </div>
        </aside>
      </div>
    </div>
  );

  // Sub-components for better organization
  function TokenHeader() {
    return (
      <Card>
        <CardHeader>
          <div className='flex flex-wrap justify-between items-start gap-4'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-primary rounded-full flex-shrink-0'></div>
              <div>
                <CardTitle className='text-3xl'>{token.header.name} ({token.header.ticker})</CardTitle>
                <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                  <span>{token.header.contractAddress.substring(0, 6)}...{token.header.contractAddress.slice(-4)}</span>
                  <button className='hover:text-primary'><Copy size={14} /></button>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4 text-muted-foreground'>
              <a href={token.header.links.website} target='_blank' rel='noreferrer' className='hover:text-primary'><Globe size={20} /></a>
              <a href={token.header.links.twitter} target='_blank' rel='noreferrer' className='hover:text-primary'><Twitter size={20} /></a>
              <a href={token.header.links.discord} target='_blank' rel='noreferrer' className='hover:text-primary'><MessageCircle size={20} /></a>
              <a href={token.header.links.telegram} target='_blank' rel='noreferrer' className='hover:text-primary'><Send size={20} /></a>
            </div>
          </div>
        </CardHeader>
        <CardContent className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left'>
          <div>
            <div className='text-sm text-muted-foreground'>Price</div>
            <div className='flex items-baseline gap-2'>
              <span className='text-2xl font-bold'>${token.header.price.toFixed(3)}</span>
              <span className='text-green-500 font-medium flex items-center text-sm'>
                <ArrowUpRight size={16} />{token.header.priceChange}
              </span>
            </div>
          </div>
          {token.header.stats.map(stat => (
            <div key={stat.label}>
              <div className='text-sm text-muted-foreground'>{stat.label}</div>
              <div className='text-xl font-bold'>{stat.value}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  function AkgReport() {
    return (
      <Card className='border-primary/20'>
        <CardHeader>
          <CardTitle>AKG Security & Insight Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center'>
            <div>
              <div className='text-sm text-muted-foreground'>Trust Score</div>
              <div className={`text-5xl font-bold ${scoreColor}`}>{token.akgReport.trustScore}/100</div>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <ShieldCheck className='text-green-500' />
              <span>Contract Verified</span>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <ShieldCheck className='text-green-500' />
              <span>{token.akgReport.liquidity.details}</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold text-red-500 mb-2'>Red Flags</h3>
              <ul className='space-y-2'>
                {token.akgReport.redFlags.map((flag, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm'><ShieldAlert size={16} className='flex-shrink-0 mt-0.5 text-red-500' /><span>{flag}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-green-500 mb-2'>Bull Flags</h3>
              <ul className='space-y-2'>
                {token.akgReport.bullFlags.map((flag, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm'><ShieldCheck size={16} className='flex-shrink-0 mt-0.5 text-green-500' /><span>{flag}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function TokenDataTabs() {
    return (
      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="orderflow">Order Flow</TabsTrigger>
          <TabsTrigger value="holders">Holders</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className='mt-4'><TokenPriceChart data={token.chartData} /></TabsContent>
        <TabsContent value="orderflow" className='mt-4'><OrderFlowTab /></TabsContent>
        <TabsContent value="holders" className='mt-4'><HoldersTab /></TabsContent>
        <TabsContent value="liquidity" className='mt-4'><LiquidityTab /></TabsContent>
      </Tabs>
    )
  }

  function OrderFlowTab() {
    return (
      <Card>
        <CardHeader><CardTitle>Live Order Flow</CardTitle></CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Order Book</h3>
            <Table>
              <TableHeader><TableRow><TableHead className='text-red-500'>Ask Price</TableHead><TableHead className='text-right'>Size</TableHead><TableHead className='text-right'>Total</TableHead></TableRow></TableHeader>
              <TableBody>
                {token.orderFlow.orderBook.asks.slice(0).reverse().map(ask => <TableRow key={ask.price}><TableCell className='text-red-500'>{ask.price}</TableCell><TableCell className='text-right'>{ask.size}</TableCell><TableCell className='text-right'>{ask.total}</TableCell></TableRow>)}
              </TableBody>
            </Table>
            <div className='text-xl font-bold text-center py-2 border-y border-border'>${token.header.price.toFixed(3)}</div>
            <Table>
              <TableHeader><TableRow><TableHead className='text-green-500'>Bid Price</TableHead><TableHead className='text-right'>Size</TableHead><TableHead className='text-right'>Total</TableHead></TableRow></TableHeader>
              <TableBody>
                {token.orderFlow.orderBook.bids.map(bid => <TableRow key={bid.price}><TableCell className='text-green-500'>{bid.price}</TableCell><TableCell className='text-right'>{bid.size}</TableCell><TableCell className='text-right'>{bid.total}</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Recent Trades</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Value</TableHead></TableRow></TableHeader>
              <TableBody>
                {token.orderFlow.recentTrades.map((trade, i) => (
                  <TableRow key={i}>
                    <TableCell className='text-muted-foreground'>{trade.time}</TableCell>
                    <TableCell className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>{trade.type.toUpperCase()}</TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell>{trade.value} {trade.isWhale && '🐳'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }

  function HoldersTab() {
    return (
      <Card>
        <CardHeader><CardTitle>Holder Analysis</CardTitle></CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Holder Distribution</h3>
            <HolderDistributionChart data={token.holders.distribution} />
          </div>
          <div>
            <div className='mb-4'>
              <h3 className='font-semibold text-lg'>Holder Stats</h3>
              <p className='text-sm text-muted-foreground'>Total Holders: {token.holders.stats.total.toLocaleString()}</p>
              <p className='text-sm text-muted-foreground'>Gini Coefficient: {token.holders.stats.gini} ({token.holders.stats.giniRemark})</p>
            </div>
            <h3 className='font-semibold text-lg'>Top Holders</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Address</TableHead><TableHead>Holdings</TableHead><TableHead>%</TableHead></TableRow></TableHeader>
              <TableBody>
                {token.holders.topHolders.map(h => <TableRow key={h.address}><TableCell className='font-mono' title={h.address}>{h.label}</TableCell><TableCell>{h.holdings}</TableCell><TableCell>{h.percentage}</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }

  function LiquidityTab() {
    return (
      <Card>
        <CardHeader><CardTitle>DEX Liquidity Pools</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Pool</TableHead><TableHead>DEX</TableHead><TableHead>Liquidity</TableHead><TableHead>24h Volume</TableHead><TableHead>APR</TableHead></TableRow></TableHeader>
            <TableBody>
              {token.liquidityPools.map(p => <TableRow key={p.name}><TableCell>{p.name}</TableCell><TableCell>{p.dex}</TableCell><TableCell>{p.liquidity}</TableCell><TableCell>{p.volume}</TableCell><TableCell className='text-green-500'>{p.apr}</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  function TradePanel() {
    const handleSetFromAmount = (val: string) => { if (!isNaN(parseFloat(val)) || val === '') setFromAmount(val) }
    const handleSetBalance = (p: number) => { const bal = tradeMode === 'buy' ? token.user.balances.SOL : token.user.balances.WIFCAT; handleSetFromAmount((bal * p / 100).toString()) }

    if (!isWalletConnected) {
      return (
        <Card>
          <CardHeader><CardTitle>Trade</CardTitle></CardHeader>
          <CardContent>
            <Button onClick={() => setIsWalletConnected(true)} className='w-full'><Wallet size={16} className='mr-2' />Connect Wallet</Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <Tabs defaultValue="buy" onValueChange={(v) => setTradeMode(v as TradeMode)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <div className="relative">
              <Input id="from" type="number" placeholder="0.0" value={fromAmount} onChange={(e) => handleSetFromAmount(e.target.value)} />
              <span className="absolute top-1/2 -translate-y-1/2 right-3 font-bold text-sm">{tradeMode === 'buy' ? 'SOL' : token.header.ticker}</span>
            </div>
            <div className="text-xs text-muted-foreground">Balance: {tradeMode === 'buy' ? `${token.user.balances.SOL.toFixed(2)} SOL` : `${token.user.balances.WIFCAT.toLocaleString()} ${token.header.ticker}`}</div>
            <div className="flex justify-end space-x-1">
              {[25, 50, 75, 100].map(p => <Button key={p} variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => handleSetBalance(p)}>{p}%</Button>)}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To (Estimated)</Label>
            <div className="relative">
              <Input id="to" type="number" placeholder="0.0" value={toAmount} readOnly className="bg-muted" />
              <span className="absolute top-1/2 -translate-y-1/2 right-3 font-bold text-sm">{tradeMode === 'buy' ? token.header.ticker : 'SOL'}</span>
            </div>
          </div>
          <Button onClick={() => alert('Trade Submitted!')} className={`w-full ${tradeMode === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
            {tradeMode === 'buy' ? `Buy ${token.header.ticker}` : `Sell ${token.header.ticker}`}
          </Button>
        </CardContent>
      </Card>
    )
  }
}
