import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getChartData } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const RollingStatistics = () => {
  const chartData = getChartData(100);
  
  // Calculate some rolling stats for display
  const volatilities = chartData.map(d => d.volatility).filter(v => v > 0);
  const maxVol = Math.max(...volatilities).toFixed(3);
  const minVol = Math.min(...volatilities).toFixed(3);
  
  const rollingMeans = chartData.map(d => d.rollingMean).filter(v => v !== 0);
  const avgRollingMean = (rollingMeans.reduce((a, b) => a + b, 0) / rollingMeans.length).toFixed(4);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Rolling Statistics"
        description="Time-varying statistical measures for understanding market dynamics"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Rolling Mean"
          value={`${avgRollingMean}%`}
          subtitle="Avg 20-day mean return"
          accentBorder
        />
        <MetricCard
          title="Max Rolling Vol"
          value={`${maxVol}%`}
          subtitle="Peak volatility"
          trend="down"
        />
        <MetricCard
          title="Min Rolling Vol"
          value={`${minVol}%`}
          subtitle="Lowest volatility"
          trend="up"
        />
        <MetricCard
          title="Vol Range"
          value={`${(parseFloat(maxVol) - parseFloat(minVol)).toFixed(3)}%`}
          subtitle="Max - Min"
        />
      </div>

      {/* Rolling Mean Chart */}
      <ChartContainer
        title="Rolling Mean Returns (20-day)"
        subtitle="Average return over trailing 20-day window"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [`${value.toFixed(4)}%`, "Rolling Mean"]}
              />
              <Line
                type="monotone"
                dataKey="rollingMean"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Rolling Std Dev Chart */}
      <ChartContainer
        title="Rolling Standard Deviation (20-day)"
        subtitle="Volatility measure over trailing 20-day window"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [`${value.toFixed(4)}%`, "Std Dev"]}
              />
              <Line
                type="monotone"
                dataKey="volatility"
                stroke="hsl(var(--chart-tertiary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Comparison Chart */}
      <ChartContainer
        title="Mean vs Standard Deviation Comparison"
        subtitle="Overlaying rolling mean and volatility to identify regime changes"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rollingMean"
                name="Rolling Mean"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="volatility"
                name="Rolling Std Dev"
                stroke="hsl(var(--chart-tertiary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Why Rolling Statistics?</strong> Unlike static measures, rolling statistics 
          capture how market behavior changes over time. A stable market has consistent rolling 
          means and low, stable volatility.
        </p>
        <p>
          <strong>Stable vs Unstable Periods:</strong> When rolling volatility spikes while 
          rolling mean turns negative, markets are in stress. Conversely, positive rolling 
          means with low volatility indicate favorable conditions.
        </p>
        <p>
          The relationship between mean and volatility helps identify risk-adjusted opportunity: 
          periods with positive mean and low volatility offer the best risk-reward profile.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default RollingStatistics;
