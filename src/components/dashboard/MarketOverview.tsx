import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getChartData, MARKET_SUMMARY } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const MarketOverview = () => {
  const chartData = getChartData(100);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Market Overview"
        description="High-level snapshot of market behavior and key performance metrics"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Return"
          value={`${MARKET_SUMMARY.sensex.totalReturn}%`}
          subtitle="Since Jan 2022"
          trend={parseFloat(MARKET_SUMMARY.sensex.totalReturn) > 0 ? "up" : "down"}
          accentBorder
        />
        <MetricCard
          title="Average Volatility"
          value={`${MARKET_SUMMARY.sensex.avgVolatility}%`}
          subtitle="20-day rolling std dev"
        />
        <MetricCard
          title="Maximum Drawdown"
          value={`${MARKET_SUMMARY.sensex.maxDrawdown}%`}
          subtitle="Peak to trough"
          trend="down"
        />
      </div>

      {/* Price Chart */}
      <ChartContainer
        title="Index Price Over Time"
        subtitle="BSE Sensex daily closing prices"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--chart-primary))"
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
          The BSE Sensex has shown a total return of {MARKET_SUMMARY.sensex.totalReturn}% 
          over the analyzed period. The average daily volatility of {MARKET_SUMMARY.sensex.avgVolatility}% 
          indicates moderate market fluctuations typical of emerging market indices.
        </p>
        <p>
          A maximum drawdown of {MARKET_SUMMARY.sensex.maxDrawdown}% was recorded, 
          reflecting periods of significant market stress. These metrics provide a 
          foundation for deeper analysis in subsequent sections.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default MarketOverview;
