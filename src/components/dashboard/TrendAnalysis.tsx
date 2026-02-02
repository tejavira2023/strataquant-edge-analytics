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
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TrendAnalysis = () => {
  const chartData = getChartData(100);
  const latest = chartData[chartData.length - 1];
  
  // Determine trend direction
  const getTrendDirection = () => {
    if (latest.price > latest.ma20 && latest.ma20 > latest.ma50) return "bullish";
    if (latest.price < latest.ma20 && latest.ma20 < latest.ma50) return "bearish";
    return "neutral";
  };
  
  const trend = getTrendDirection();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Trend Analysis"
        description="Moving average crossovers and trend direction indicators"
      />

      {/* Trend Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-metric border-accent-left">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Current Trend
          </p>
          <div className="flex items-center gap-2">
            {trend === "bullish" && (
              <>
                <TrendingUp className="w-8 h-8 text-chart-success" />
                <span className="text-2xl font-bold text-chart-success">Bullish</span>
              </>
            )}
            {trend === "bearish" && (
              <>
                <TrendingDown className="w-8 h-8 text-chart-danger" />
                <span className="text-2xl font-bold text-chart-danger">Bearish</span>
              </>
            )}
            {trend === "neutral" && (
              <>
                <Minus className="w-8 h-8 text-chart-tertiary" />
                <span className="text-2xl font-bold text-chart-tertiary">Neutral</span>
              </>
            )}
          </div>
        </div>
        <MetricCard
          title="10-Day MA"
          value={latest?.ma10?.toFixed(0) || "N/A"}
          subtitle="Short-term trend"
        />
        <MetricCard
          title="20-Day MA"
          value={latest?.ma20?.toFixed(0) || "N/A"}
          subtitle="Medium-term trend"
        />
        <MetricCard
          title="50-Day MA"
          value={latest?.ma50?.toFixed(0) || "N/A"}
          subtitle="Long-term trend"
        />
      </div>

      {/* Price with Moving Averages */}
      <ChartContainer
        title="Price with Moving Averages"
        subtitle="10-day, 20-day, and 50-day simple moving averages"
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
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                name="Price"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ma10"
                name="MA10"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ma20"
                name="MA20"
                stroke="hsl(var(--chart-tertiary))"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ma50"
                name="MA50"
                stroke="hsl(var(--chart-danger))"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Moving Average Analysis:</strong> When shorter-term MAs are above 
          longer-term MAs and price is above all MAs, the trend is bullish. The reverse 
          configuration indicates a bearish trend.
        </p>
        <p>
          <strong>Current Status:</strong> The market is currently in a {trend} configuration. 
          Price relative to the 20-day MA: {latest.price > latest.ma20 ? "Above" : "Below"} 
          ({((latest.price - latest.ma20) / latest.ma20 * 100).toFixed(2)}%).
        </p>
        <p>
          Moving average crossovers can signal trend changes. A "Golden Cross" (50-day 
          crossing above 200-day) is bullish, while a "Death Cross" is bearish.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default TrendAnalysis;
