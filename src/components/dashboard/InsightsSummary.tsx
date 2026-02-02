import { MARKET_SUMMARY, MARKET_EVENTS } from "@/lib/marketData";
import {
  PageHeader,
  InterpretationPanel,
} from "./DashboardComponents";
import { CheckCircle2, AlertTriangle, Info, TrendingUp, Shield, BarChart3 } from "lucide-react";

const InsightsSummary = () => {
  const keyFindings = [
    {
      icon: TrendingUp,
      category: "Performance",
      finding: `Total return of ${MARKET_SUMMARY.sensex.totalReturn}% over the analyzed period`,
      interpretation: "Indicates overall positive market trajectory despite periods of volatility.",
    },
    {
      icon: BarChart3,
      category: "Volatility",
      finding: `Average daily volatility of ${MARKET_SUMMARY.sensex.avgVolatility}%`,
      interpretation: "Moderate volatility consistent with emerging market equity characteristics.",
    },
    {
      icon: Shield,
      category: "Risk",
      finding: `Maximum drawdown of ${MARKET_SUMMARY.sensex.maxDrawdown}%`,
      interpretation: "Significant drawdown periods occurred, requiring robust risk management.",
    },
    {
      icon: CheckCircle2,
      category: "Risk-Adjusted",
      finding: `Sharpe Ratio of ${MARKET_SUMMARY.sensex.sharpeRatio}`,
      interpretation: "Positive risk-adjusted returns, though below developed market benchmarks.",
    },
  ];

  const observations = [
    "Volatility clustering observed: High volatility periods tend to follow other high volatility periods.",
    "Drawdown recovery times varied significantly based on the nature of the underlying shock.",
    "Moving average crossovers provided useful trend direction signals with moderate reliability.",
    "Market stress index showed predictive value for near-term volatility expansion.",
    "Regime transitions from stable to volatile phases were more common than direct transitions to crisis.",
    `Cross-market correlation with S&P 500 remains high at ${0.76}, limiting diversification benefits.`,
  ];

  const limitations = [
    "Historical analysis does not guarantee future performance.",
    "Stress index construction is based on backward-looking metrics.",
    "Regime classification thresholds are somewhat arbitrary and context-dependent.",
    "Data quality and survivorship bias may affect conclusions.",
    "Analysis does not account for transaction costs, taxes, or slippage.",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Insights Summary"
        description="Key findings, observations, and research limitations from the analysis"
      />

      {/* Key Findings */}
      <div className="card-chart">
        <h3 className="text-lg font-semibold mb-6">Key Findings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFindings.map((item, idx) => (
            <div key={idx} className="p-4 border border-border border-l-4 border-l-accent">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.category}
                </span>
              </div>
              <p className="font-semibold mb-1">{item.finding}</p>
              <p className="text-sm text-muted-foreground">{item.interpretation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Behavior Observations */}
      <div className="card-chart">
        <h3 className="text-lg font-semibold mb-6">Market Behavior Observations</h3>
        <ul className="space-y-3">
          {observations.map((obs, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-chart-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Market Events Impact */}
      <div className="card-chart">
        <h3 className="text-lg font-semibold mb-6">Significant Market Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Event</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Impact</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_EVENTS.map((event) => (
                <tr key={event.date} className="border-b border-border">
                  <td className="py-3 px-4 font-mono text-muted-foreground">{event.date}</td>
                  <td className="py-3 px-4 font-medium">{event.event}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-xs uppercase tracking-wider ${
                      event.impact === "negative" ? "text-chart-danger" : "text-chart-success"
                    }`}>
                      {event.impact === "negative" ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3" />
                      )}
                      {event.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Limitations */}
      <InterpretationPanel title="Research Limitations">
        <ul className="space-y-2">
          {limitations.map((lim, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </InterpretationPanel>

      {/* Summary Statement */}
      <div className="p-6 bg-primary text-primary-foreground">
        <h3 className="text-lg font-semibold mb-3">Summary Statement</h3>
        <p className="leading-relaxed opacity-90">
          This analysis provides a comprehensive view of market behavior through multiple 
          quantitative lenses. The BSE Sensex demonstrates characteristics typical of 
          emerging market indices: higher volatility, significant drawdown potential, but 
          also attractive long-term returns. The multi-factor stress index and regime 
          detection framework offer practical tools for monitoring market conditions and 
          adjusting risk exposure. However, all findings should be considered within the 
          context of the limitations noted above and supplemented with forward-looking 
          analysis before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default InsightsSummary;
