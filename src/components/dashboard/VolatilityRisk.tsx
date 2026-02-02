import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { getChartData, MARKET_SUMMARY } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const VolatilityRisk = () => {
  const chartData = getChartData(100);

  // Identify high volatility periods
  const avgVol = parseFloat(MARKET_SUMMARY.sensex.avgVolatility);
  const highVolDays = chartData.filter(d => d.volatility > avgVol * 1.5).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Volatility and Risk"
        description="Rolling volatility metrics and risk indicators for portfolio management"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Current Volatility"
          value={`${chartData[chartData.length - 1]?.volatility.toFixed(2)}%`}
          subtitle="20-day rolling"
          accentBorder
        />
        <MetricCard
          title="Average Volatility"
          value={`${MARKET_SUMMARY.sensex.avgVolatility}%`}
          subtitle="Period average"
        />
        <MetricCard
          title="High Vol Days"
          value={highVolDays}
          subtitle="Above 1.5x average"
          trend="down"
        />
        <MetricCard
          title="Calmar Ratio"
          value={MARKET_SUMMARY.sensex.calmarRatio}
          subtitle="Return / Max DD"
        />
      </div>

      {/* Rolling Volatility Chart */}
      <ChartContainer
        title="20-Day Rolling Volatility"
        subtitle="Standard deviation of returns over trailing 20 days"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
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
                formatter={(value: number) => [`${value.toFixed(3)}%`, "Volatility"]}
              />
              <Area
                type="monotone"
                dataKey="volatility"
                stroke="hsl(var(--chart-primary))"
                fill="hsl(var(--chart-primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Volatility vs Price */}
      <ChartContainer
        title="Price vs Volatility Overlay"
        subtitle="Comparing index level with volatility regime"
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
                yAxisId="price"
                orientation="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <YAxis
                yAxisId="vol"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--chart-tertiary))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--chart-secondary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="vol"
                type="monotone"
                dataKey="volatility"
                stroke="hsl(var(--chart-tertiary))"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          Rolling volatility captures the changing nature of market uncertainty. 
          Periods of high volatility often coincide with market corrections or 
          external shocks, while low volatility typically accompanies trending markets.
        </p>
        <p>
          The current volatility reading of {chartData[chartData.length - 1]?.volatility.toFixed(2)}% 
          compared to the average of {MARKET_SUMMARY.sensex.avgVolatility}% provides context 
          for current market conditions. Elevated readings warrant closer risk monitoring.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default VolatilityRisk;
