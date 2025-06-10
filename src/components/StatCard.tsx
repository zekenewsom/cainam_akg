import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SparklineChart from "@/components/SparklineChart";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'positive' | 'negative';
  sparklineData?: number[];
}

export default function StatCard({ label, value, icon: Icon, change, changeType, sparklineData }: StatCardProps) {
  const changeColor = changeType === 'positive' ? 'text-green-500' : 'text-red-500';
  const sparklineColor = changeType === 'positive' ? '#22c55e' : '#ef4444';

  // Format sparkline data for the chart component
  const chartData = sparklineData ? sparklineData.map(v => ({ value: v })) : [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
              <p className={`text-xs ${changeColor}`}>
                {change}
              </p>
            )}
          </div>
          {sparklineData && (
            <SparklineChart data={chartData} color={sparklineColor} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
