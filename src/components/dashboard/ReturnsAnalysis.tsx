import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { getChartData, SENSEX_RETURN_HISTOGRAM, MARKET_SUMMARY } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const ReturnsAnalysis = () => {
  const chartData = getChartData(100);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Returns Analysis"
        description="Daily return distributions and patterns for understanding price movements"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Average Daily Return"
          value={`${MARKET_SUMMARY.sensex.avgReturn}%`}
          subtitle="Arithmetic mean"
          accentBorder
        />
        <MetricCard
          title="Sharpe Ratio"
          value={MARKET_SUMMARY.sensex.sharpeRatio}
          subtitle="Risk-adjusted return"
        />
        <MetricCard
          title="Positive Days"
          value="52.3%"
          subtitle="Days with positive returns"
        />
      </div>

      {/* Daily Returns Chart */}
      <ChartContainer
        title="Daily Returns"
        subtitle="Percentage change from previous day"
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
                domain={[-5, 5]}
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
              <Line
                type="monotone"
                dataKey="returns"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Histogram */}
      <ChartContainer
        title="Return Distribution"
        subtitle="Histogram of daily returns showing frequency distribution"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SENSEX_RETURN_HISTOGRAM}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="bucket"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Why Returns Instead of Prices?</strong> Returns normalize price 
          movements as percentages, making comparisons across different price levels 
          and time periods meaningful. A 100-point move at 60,000 is different from 
          the same move at 30,000.
        </p>
        <p>
          The return distribution shows a roughly normal shape with slight negative 
          skewness, indicating occasional larger losses than gains. This asymmetry 
          is typical of equity markets and important for risk assessment.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default ReturnsAnalysis;
