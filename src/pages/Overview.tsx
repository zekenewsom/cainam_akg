import { Link } from 'react-router-dom';
import { DollarSign, BarChart, Users, Activity, BrainCircuit, TrendingDown, Layers, Flame, LineChart as LineChartIcon } from 'lucide-react';

import StatCard from '@/components/StatCard';
import { mockOverviewData } from '@/data/mockOverviewData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Overview() {
  // Map icons to labels
  const vitalIcons = {
    'SOL Price': DollarSign,
    'Solana Market Cap': BarChart,
    '24h Volume': Activity,
    'Network TPS': Users,
    'AKG Sentiment': BrainCircuit,
  };

  const derivativeIcons = {
    'Total Open Interest': Layers,
    'Avg. Funding Rate': TrendingDown,
    '24h Liquidations': Flame,
    'Top Perp Exchange': LineChartIcon,
  }

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        {mockOverviewData.marketVitals.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={vitalIcons[stat.label as keyof typeof vitalIcons] || DollarSign}
            sparklineData={stat.sparklineData}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Spot Market Movers</CardTitle>
            <CardDescription>Top daily gainers and losers across Solana DEXes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="gainers">
                <TabsList className="mb-4">
                  <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                  <TabsTrigger value="losers">Top Losers</TabsTrigger>
                </TabsList>
                <TabsContent value="gainers">
                  <MoversTable data={mockOverviewData.spotMovers.gainers} type="positive" />
                </TabsContent>
                <TabsContent value="losers">
                  <MoversTable data={mockOverviewData.spotMovers.losers} type="negative" />
                </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="col-span-4 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader><CardTitle>🔥 Hot Contracts</CardTitle></CardHeader>
            <CardContent>
              <ul className='space-y-3'>
                {mockOverviewData.hotContracts.map((contract) => (
                  <li key={contract.name} className='flex justify-between items-center p-2 rounded-md hover:bg-accent'>
                    <span className='font-bold'>{contract.name}</span>
                    <span className='text-sm text-muted-foreground'>{contract.momentum}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>📈 Trending Narratives</CardTitle></CardHeader>
            <CardContent>
              <ul className='space-y-3'>
                {mockOverviewData.trendingNarratives.map((narrative) => (
                  <li key={narrative.name} className='flex justify-between items-center p-2 rounded-md hover:bg-accent'>
                    <span className='font-bold'>{narrative.name}</span>
                    <span className='text-sm text-muted-foreground'>{narrative.metric}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
       <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {mockOverviewData.derivativesSummary.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={derivativeIcons[stat.label as keyof typeof derivativeIcons] || Layers}
            sparklineData={stat.sparklineData}
          />
        ))}
      </div>
    </div>
  );
}

// Helper component for the movers table
function MoversTable({ data, type }: { data: typeof mockOverviewData.spotMovers.gainers, type: 'positive' | 'negative' }) {
  const changeColor = type === 'positive' ? 'text-green-500' : 'text-red-500';
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className={changeColor}>24h Change</TableHead>
          <TableHead className='text-right'>Market Cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((token) => (
          <TableRow key={token.address}>
            <TableCell className="font-medium">
              <Link to={`/token/${token.address}`} className="hover:underline">{token.name}</Link>
            </TableCell>
            <TableCell>{token.price}</TableCell>
            <TableCell className={changeColor}>{token.change}</TableCell>
            <TableCell className='text-right'>{token.marketCap}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
