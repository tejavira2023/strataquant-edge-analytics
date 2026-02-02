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
import { getChartData, MARKET_SUMMARY, INDEX_CORRELATION } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const MarketComparison = () => {
  const chartData = getChartData(100);
  
  // Normalize prices for comparison
  const normalizedData = chartData.map(d => ({
    ...d,
    sensexNorm: (d.price / chartData[0].price) * 100,
    sp500Norm: (d.sp500 / chartData[0].sp500) * 100,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Market Comparison"
        description="Comparative analysis between BSE Sensex and S&P 500 indices"
      />

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Correlation"
          value={INDEX_CORRELATION.toFixed(2)}
          subtitle="Price correlation"
          accentBorder
        />
        <MetricCard
          title="Sensex Return"
          value={`${MARKET_SUMMARY.sensex.totalReturn}%`}
          subtitle="Total return"
          trend={parseFloat(MARKET_SUMMARY.sensex.totalReturn) > 0 ? "up" : "down"}
        />
        <MetricCard
          title="S&P 500 Return"
          value={`${MARKET_SUMMARY.sp500.totalReturn}%`}
          subtitle="Total return"
          trend={parseFloat(MARKET_SUMMARY.sp500.totalReturn) > 0 ? "up" : "down"}
        />
        <MetricCard
          title="Relative Performance"
          value={`${(parseFloat(MARKET_SUMMARY.sensex.totalReturn) - parseFloat(MARKET_SUMMARY.sp500.totalReturn)).toFixed(2)}%`}
          subtitle="Sensex vs S&P"
        />
      </div>

      {/* Normalized Price Comparison */}
      <ChartContainer
        title="Normalized Price Comparison"
        subtitle="Both indices rebased to 100 at the start of the period"
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [value.toFixed(2), ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sensexNorm"
                name="BSE Sensex"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="sp500Norm"
                name="S&P 500"
                stroke="hsl(var(--chart-tertiary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Volatility Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartContainer
          title="Sensex Volatility Profile"
          subtitle="20-day rolling volatility"
        >
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => value.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
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
                  type="monotone"
                  dataKey="volatility"
                  stroke="hsl(var(--chart-primary))"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-secondary">
              <p className="text-xs text-muted-foreground uppercase">Avg Volatility</p>
              <p className="text-lg font-bold font-data">{MARKET_SUMMARY.sensex.avgVolatility}%</p>
            </div>
            <div className="text-center p-3 bg-secondary">
              <p className="text-xs text-muted-foreground uppercase">Max Drawdown</p>
              <p className="text-lg font-bold font-data">{MARKET_SUMMARY.sensex.maxDrawdown}%</p>
            </div>
          </div>
        </ChartContainer>

        <div className="card-chart">
          <h3 className="text-lg font-semibold mb-2">S&P 500 Risk Profile</h3>
          <p className="text-sm text-muted-foreground mb-6">Key risk metrics</p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Average Volatility</span>
              <span className="font-bold font-data">{MARKET_SUMMARY.sp500.avgVolatility}%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Maximum Drawdown</span>
              <span className="font-bold font-data">{MARKET_SUMMARY.sp500.maxDrawdown}%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Sharpe Ratio</span>
              <span className="font-bold font-data">{MARKET_SUMMARY.sp500.sharpeRatio}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Calmar Ratio</span>
              <span className="font-bold font-data">{MARKET_SUMMARY.sp500.calmarRatio}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Cross-Market Correlation:</strong> With a correlation of {INDEX_CORRELATION}, 
          the BSE Sensex and S&P 500 show {INDEX_CORRELATION > 0.7 ? "strong" : INDEX_CORRELATION > 0.4 ? "moderate" : "weak"} 
          co-movement. This reflects the interconnected nature of global equity markets.
        </p>
        <p>
          <strong>Key Differences:</strong> The Sensex typically exhibits higher volatility 
          ({MARKET_SUMMARY.sensex.avgVolatility}% vs {MARKET_SUMMARY.sp500.avgVolatility}%) 
          consistent with emerging market characteristics. The S&P 500's higher Sharpe ratio 
          ({MARKET_SUMMARY.sp500.sharpeRatio} vs {MARKET_SUMMARY.sensex.sharpeRatio}) 
          indicates better risk-adjusted returns over this period.
        </p>
        <p>
          Diversification across these markets can reduce portfolio volatility, though 
          correlations tend to increase during crisis periods.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default MarketComparison;
