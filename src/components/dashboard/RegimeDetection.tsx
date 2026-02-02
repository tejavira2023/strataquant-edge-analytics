import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getChartData } from "@/lib/marketData";
import {
  PageHeader,
  ChartContainer,
  InterpretationPanel,
  RegimeBadge,
} from "./DashboardComponents";

const RegimeDetection = () => {
  const chartData = getChartData(150);
  
  // Count regime days
  const regimeCounts = {
    Stable: chartData.filter(d => d.regime === "Stable").length,
    Volatile: chartData.filter(d => d.regime === "Volatile").length,
    Crisis: chartData.filter(d => d.regime === "Crisis").length,
  };
  
  const totalDays = chartData.length;
  const currentRegime = chartData[chartData.length - 1]?.regime || "Stable";

  // Create regime timeline data with numeric values for charting
  const regimeTimelineData = chartData.map(d => ({
    ...d,
    regimeValue: d.regime === "Stable" ? 1 : d.regime === "Volatile" ? 2 : 3,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Regime Detection"
        description="Statistical classification of market phases into distinct behavioral regimes"
      />

      {/* Current Regime */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-metric border-accent-left">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Current Regime
          </p>
          <RegimeBadge regime={currentRegime} />
        </div>
        <div className="card-metric">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Stable Days
          </p>
          <p className="text-3xl font-bold font-data text-chart-success">
            {regimeCounts.Stable}
          </p>
          <p className="text-sm text-muted-foreground">
            {((regimeCounts.Stable / totalDays) * 100).toFixed(1)}% of period
          </p>
        </div>
        <div className="card-metric">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Volatile Days
          </p>
          <p className="text-3xl font-bold font-data text-chart-tertiary">
            {regimeCounts.Volatile}
          </p>
          <p className="text-sm text-muted-foreground">
            {((regimeCounts.Volatile / totalDays) * 100).toFixed(1)}% of period
          </p>
        </div>
        <div className="card-metric">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Crisis Days
          </p>
          <p className="text-3xl font-bold font-data text-chart-danger">
            {regimeCounts.Crisis}
          </p>
          <p className="text-sm text-muted-foreground">
            {((regimeCounts.Crisis / totalDays) * 100).toFixed(1)}% of period
          </p>
        </div>
      </div>

      {/* Regime Timeline */}
      <ChartContainer
        title="Market Regime Timeline"
        subtitle="Classification of each day into Stable (green), Volatile (yellow), or Crisis (red)"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={regimeTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis
                domain={[0, 4]}
                ticks={[1, 2, 3]}
                tickFormatter={(value) => 
                  value === 1 ? "Stable" : value === 2 ? "Volatile" : value === 3 ? "Crisis" : ""
                }
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [
                  value === 1 ? "Stable" : value === 2 ? "Volatile" : "Crisis",
                  "Regime"
                ]}
              />
              <Area
                type="stepAfter"
                dataKey="regimeValue"
                stroke="hsl(var(--chart-primary))"
                fill="hsl(var(--chart-primary))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Regime Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-metric regime-stable">
          <h4 className="text-lg font-semibold mb-3">Stable Regime</h4>
          <p className="text-sm leading-relaxed">
            Characterized by low volatility, minimal drawdowns, and consistent positive 
            momentum. Markets tend to trend smoothly with predictable behavior. 
            Risk-adjusted returns are typically favorable in this environment.
          </p>
          <div className="mt-4 text-xs uppercase tracking-wider">
            Stress Index: 0-30
          </div>
        </div>
        
        <div className="card-metric regime-volatile">
          <h4 className="text-lg font-semibold mb-3">Volatile Regime</h4>
          <p className="text-sm leading-relaxed">
            Marked by elevated volatility and uncertain direction. Price swings become 
            more pronounced, and trend following becomes challenging. Risk management 
            becomes more critical during this phase.
          </p>
          <div className="mt-4 text-xs uppercase tracking-wider">
            Stress Index: 30-60
          </div>
        </div>
        
        <div className="card-metric regime-crisis">
          <h4 className="text-lg font-semibold mb-3">Crisis Regime</h4>
          <p className="text-sm leading-relaxed">
            Extreme market conditions with high volatility, significant drawdowns, and 
            potential for rapid price declines. Correlations between assets often spike, 
            reducing diversification benefits. Capital preservation is paramount.
          </p>
          <div className="mt-4 text-xs uppercase tracking-wider">
            Stress Index: 60-100
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>Regime Detection Methodology:</strong> Market regimes are identified 
          using the composite stress index thresholds. This approach clusters market 
          behavior into three distinct phases based on observable risk metrics.
        </p>
        <p>
          <strong>Current Analysis:</strong> The market is currently in a {currentRegime.toLowerCase()} regime. 
          Over the analyzed period, the market spent {((regimeCounts.Stable / totalDays) * 100).toFixed(0)}% 
          of time in stable conditions, indicating {regimeCounts.Stable > regimeCounts.Volatile + regimeCounts.Crisis 
            ? "generally favorable market conditions" 
            : "significant periods of market stress"}.
        </p>
        <p>
          Understanding regime transitions helps anticipate shifts in market behavior and 
          adjust risk exposure accordingly.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default RegimeDetection;
