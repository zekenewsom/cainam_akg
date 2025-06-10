import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklineChartProps {
  data: { value: number }[];
  color: string;
}

export default function SparklineChart({ data, color }: SparklineChartProps) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={100}
          height={40}
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5, }}
        >
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              fontSize: '12px',
              padding: '2px 8px',
            }}
            labelFormatter={() => ''}
            formatter={(value: number) => [value.toLocaleString(), 'Value']}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
