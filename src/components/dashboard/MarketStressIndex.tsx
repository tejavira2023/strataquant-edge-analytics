import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { getChartData, MARKET_STRESS_INDEX } from "@/lib/marketData";
import {
  PageHeader,
  MetricCard,
  ChartContainer,
  InterpretationPanel,
} from "./DashboardComponents";

const MarketStressIndex = () => {
  const chartData = getChartData(150);
  
  const currentStress = chartData[chartData.length - 1]?.stressIndex || 0;
  const avgStress = (chartData.map(d => d.stressIndex).reduce((a, b) => a + b, 0) / chartData.length).toFixed(1);
  const maxStress = Math.max(...chartData.map(d => d.stressIndex)).toFixed(1);
  const highStressDays = chartData.filter(d => d.stressIndex > 60).length;
  
  const getStressLevel = (stress: number) => {
    if (stress < 30) return { label: "Low", color: "text-chart-success" };
    if (stress < 60) return { label: "Moderate", color: "text-chart-tertiary" };
    return { label: "High", color: "text-chart-danger" };
  };
  
  const currentLevel = getStressLevel(currentStress);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Market Stress Index"
        description="Composite indicator measuring market tension from multiple risk factors"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-metric border-accent-left">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Current Stress Level
          </p>
          <p className={`text-3xl font-bold font-data ${currentLevel.color}`}>
            {currentStress.toFixed(1)}
          </p>
          <p className={`text-sm font-medium ${currentLevel.color}`}>
            {currentLevel.label} Stress
          </p>
        </div>
        <MetricCard
          title="Average Stress"
          value={avgStress}
          subtitle="Period average"
        />
        <MetricCard
          title="Peak Stress"
          value={maxStress}
          subtitle="Maximum recorded"
          trend="down"
        />
        <MetricCard
          title="High Stress Days"
          value={highStressDays}
          subtitle="Above 60 threshold"
          trend="down"
        />
      </div>

      {/* Stress Index Chart */}
      <ChartContainer
        title="Market Stress Index (0-100)"
        subtitle="Composite measure of volatility, drawdowns, and momentum instability"
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
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 0,
                }}
                formatter={(value: number) => [value.toFixed(1), "Stress Index"]}
              />
              {/* Stress zones */}
              <ReferenceArea y1={0} y2={30} fill="hsl(var(--chart-success))" fillOpacity={0.1} />
              <ReferenceArea y1={30} y2={60} fill="hsl(var(--chart-tertiary))" fillOpacity={0.1} />
              <ReferenceArea y1={60} y2={100} fill="hsl(var(--chart-danger))" fillOpacity={0.1} />
              <ReferenceLine y={30} stroke="hsl(var(--chart-success))" strokeDasharray="5 5" />
              <ReferenceLine y={60} stroke="hsl(var(--chart-danger))" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="stressIndex"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Stress Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-metric">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Volatility Component
          </h4>
          <p className="text-sm text-muted-foreground">
            Measures the rolling standard deviation of returns. Higher volatility 
            contributes up to 40 points to the stress index.
          </p>
          <div className="mt-3 h-2 bg-secondary">
            <div className="h-full bg-chart-primary" style={{ width: "40%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Weight: 40%</p>
        </div>
        
        <div className="card-metric">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Drawdown Component
          </h4>
          <p className="text-sm text-muted-foreground">
            Captures the depth of decline from recent peaks. Deeper drawdowns 
            indicate higher stress levels, contributing up to 40 points.
          </p>
          <div className="mt-3 h-2 bg-secondary">
            <div className="h-full bg-chart-tertiary" style={{ width: "40%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Weight: 40%</p>
        </div>
        
        <div className="card-metric">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Momentum Component
          </h4>
          <p className="text-sm text-muted-foreground">
            Tracks large single-day moves that indicate market instability. 
            Extreme daily returns add up to 20 points.
          </p>
          <div className="mt-3 h-2 bg-secondary">
            <div className="h-full bg-chart-danger" style={{ width: "20%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Weight: 20%</p>
        </div>
      </div>

      {/* Interpretation */}
      <InterpretationPanel>
        <p>
          <strong>How the Stress Index Works:</strong> The Market Stress Index combines 
          three key risk indicators into a single 0-100 scale. Readings below 30 indicate 
          low stress (green zone), 30-60 is moderate (yellow zone), and above 60 is high 
          stress (red zone).
        </p>
        <p>
          <strong>Current Reading:</strong> At {currentStress.toFixed(1)}, the market is 
          currently in a {currentLevel.label.toLowerCase()} stress environment. This 
          suggests {currentStress < 30 
            ? "favorable conditions for risk-taking" 
            : currentStress < 60 
            ? "caution is warranted but not extreme"
            : "elevated caution and potential risk reduction"}.
        </p>
      </InterpretationPanel>
    </div>
  );
};

export default MarketStressIndex;
