import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getChartData, MARKET_SUMMARY, MARKET_EVENTS } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const DrawdownsShocks = () => {
  const chartData = getChartData(200); // Get more data for drawdown analysis
  
  const minDrawdown = Math.min(...chartData.map(d => d.drawdown));
  const avgDrawdown = (chartData.map(d => d.drawdown).reduce((a, b) => a + b, 0) / chartData.length).toFixed(2);
  
  // Calculate recovery statistics
  const significantDrawdowns = chartData.filter(d => d.drawdown < -5).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Drawdowns and Shocks"
        description="Peak-to-trough decline analysis and major market shock events"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Maximum Drawdown"
          value={`${MARKET_SUMMARY.sensex.maxDrawdown}%`}
          subtitle="Worst peak-to-trough"
          trend="down"
          accentBorder
        />
        <MetricCard
          title="Current Drawdown"
          value={`${chartData[chartData.length - 1]?.drawdown.toFixed(2)}%`}
          subtitle="From recent peak"
        />
        <MetricCard
          title="Avg Drawdown"
          value={`${avgDrawdown}%`}
          subtitle="Mean drawdown level"
        />
        <MetricCard
          title="Significant DD Days"
          value={significantDrawdowns}
          subtitle="Days below -5%"
          trend="down"
        />
      </div>

      {/* Drawdown Chart */}
      <ChartContainer
        title="Drawdown Curve"
        subtitle="Percentage decline from running peak"
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
                domain={["auto", 0]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, "Drawdown"]}
              />
              <ReferenceLine y={-10} stroke="hsl(var(--chart-tertiary))" strokeDasharray="5 5" />
              <ReferenceLine y={-20} stroke="hsl(var(--chart-danger))" strokeDasharray="5 5" />
              <Area
                type="monotone"
                dataKey="drawdown"
                stroke="hsl(var(--chart-danger))"
                fill="hsl(var(--chart-danger))"
                fillOpacity={0.3}
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Market Events */}
      <ChartContainer
        title="Major Market Shock Events"
        subtitle="Significant events that impacted market performance"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MARKET_EVENTS.map((event) => (
            <div
              key={event.date}
              className={`p-4 border ${
                event.impact === "negative" 
                  ? "border-l-4 border-l-chart-danger bg-chart-danger/5" 
                  : "border-l-4 border-l-chart-success bg-chart-success/5"
              }`}
            >
              <p className="text-xs text-muted-foreground font-mono">{event.date}</p>
              <p className="font-semibold mt-1">{event.event}</p>
              <p className={`text-xs mt-1 uppercase tracking-wider ${
                event.impact === "negative" ? "text-chart-danger" : "text-chart-success"
              }`}>
                {event.impact} Impact
              </p>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Understanding Drawdowns:</strong> A drawdown measures the decline from a 
          peak to a subsequent trough. It represents the maximum loss an investor would 
          experience if they bought at the peak.
        </p>
        <p>
          <strong>Market Resilience:</strong> The maximum drawdown of {MARKET_SUMMARY.sensex.maxDrawdown}% 
          provides insight into worst-case scenarios. Markets typically recover from drawdowns, 
          but the recovery time varies significantly based on the severity and cause.
        </p>
        <p>
          Reference lines at -10% and -20% represent common thresholds for "correction" and 
          "bear market" territory respectively.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default DrawdownsShocks;
