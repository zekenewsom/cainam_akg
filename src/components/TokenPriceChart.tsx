import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// The OHLC data is [open, high, low, close]. We only need the close price (index 3).
interface TokenPriceChartProps {
  data: { x: Date; y: number[] }[];
}

export default function TokenPriceChart({ data }: TokenPriceChartProps) {
  const chartData = data.map(d => ({
    x: d.x.getTime(),
    y: d.y[3] // Use the closing price
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>Price history for the selected token.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="priceChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="x"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toFixed(4)}`}
              />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                formatter={(value: number) => [`$${value.toFixed(4)}`, "Price"]}
              />
              <Area type="monotone" dataKey="y" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#priceChartFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
