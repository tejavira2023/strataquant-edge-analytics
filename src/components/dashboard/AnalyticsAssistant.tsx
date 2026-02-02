import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "./DashboardComponents";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const predefinedResponses: Record<string, string> = {
  "volatility": "**Volatility** measures the dispersion of returns for a given security or market index. In our analysis, we use the 20-day rolling standard deviation of daily returns as the primary volatility measure. Higher volatility indicates greater uncertainty and risk, as prices fluctuate more dramatically. Volatility is not directional—it measures the magnitude of price changes, not their direction.",
  
  "drawdown": "A **drawdown** is the peak-to-trough decline during a specific period of investment. It measures the largest percentage drop from a historical peak before a new peak is achieved. For example, if an index falls from 60,000 to 48,000 before recovering, the drawdown is -20%. Maximum drawdown is a key risk metric as it represents the worst-case scenario for an investor who bought at the peak.",
  
  "stress index": "The **Market Stress Index** is a composite indicator (0-100 scale) that combines three risk factors: (1) Rolling volatility (40% weight), (2) Current drawdown depth (40% weight), and (3) Momentum instability from large daily moves (20% weight). Readings below 30 indicate low stress, 30-60 is moderate, and above 60 signals high market stress requiring elevated caution.",
  
  "returns": "**Returns** measure the percentage change in price from one period to the next. We use daily returns (today's close vs. yesterday's close) for analysis. Returns are preferred over raw prices because they normalize for different price levels and are stationary, making them suitable for statistical analysis. A 1% move is the same proportionally whether the index is at 30,000 or 60,000.",
  
  "moving average": "A **moving average** smooths price data by calculating the average over a specified number of periods. We use 10-day (short-term), 20-day (medium-term), and 50-day (long-term) simple moving averages. When shorter MAs are above longer MAs and price is above all MAs, the trend is considered bullish. Moving average crossovers can signal potential trend changes.",
  
  "regime": "**Market regimes** are distinct phases of market behavior characterized by different risk-return profiles. We classify three regimes: (1) **Stable** - low volatility, trending markets, stress index below 30; (2) **Volatile** - elevated uncertainty, stress index 30-60; (3) **Crisis** - extreme conditions, high correlation spikes, stress above 60. Understanding the current regime helps calibrate risk exposure.",
  
  "sharpe ratio": "The **Sharpe Ratio** measures risk-adjusted returns by dividing excess return (return above the risk-free rate) by volatility. A higher Sharpe ratio indicates better return per unit of risk. Generally, Sharpe ratios above 1.0 are considered good, above 2.0 is very good, and above 3.0 is excellent. Our analysis shows a Sharpe ratio of 0.85 for the Sensex.",
  
  "correlation": "**Correlation** measures how two assets move in relation to each other, ranging from -1 (perfect inverse) to +1 (perfect positive). The 0.76 correlation between Sensex and S&P 500 indicates they tend to move in the same direction. High correlation reduces diversification benefits, especially during market stress when correlations typically increase further.",
  
  "help": "I can help explain various financial concepts and metrics used in this analysis. Try asking about:\n\n• **Volatility** - Market fluctuation measure\n• **Drawdown** - Peak-to-trough decline\n• **Stress Index** - Composite risk indicator\n• **Returns** - Price change percentages\n• **Moving Averages** - Trend indicators\n• **Regimes** - Market phase classification\n• **Sharpe Ratio** - Risk-adjusted returns\n• **Correlation** - Asset co-movement\n\nJust type your question and I'll provide an explanation!",
};

const findResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return "I understand you're asking about market analysis. I can help explain concepts like volatility, drawdowns, stress indices, returns, moving averages, market regimes, Sharpe ratios, and correlation. Could you please rephrase your question or ask about one of these specific topics? Type 'help' to see all available topics.";
};

const AnalyticsAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the StrataQuant Analytics Assistant. I can help explain financial concepts, chart interpretations, and metrics used throughout this platform. What would you like to know? Type 'help' to see available topics.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const assistantResponse: Message = {
      role: "assistant",
      content: findResponse(input),
    };

    setMessages([...messages, userMessage, assistantResponse]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <PageHeader
        title="Analytics Assistant"
        description="Educational support for understanding financial metrics and chart interpretations"
      />

      {/* Chat Container */}
      <div className="flex-1 flex flex-col border border-border bg-card min-h-[500px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-xs uppercase tracking-wider opacity-70 mb-2">
                  {message.role === "user" ? "You" : "Analytics Assistant"}
                </p>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content.split("**").map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about volatility, drawdowns, stress index, regimes..."
              className="flex-1 bg-secondary border-0 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
            <Button onClick={handleSend} variant="hero" size="default">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This assistant provides educational explanations only. Not financial advice.
          </p>
        </div>
      </div>

      {/* Quick Topics */}
      <div className="card-metric">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Quick Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Volatility", "Drawdown", "Stress Index", "Returns", "Moving Average", "Regime", "Sharpe Ratio", "Correlation"].map(
            (topic) => (
              <button
                key={topic}
                onClick={() => setInput(`What is ${topic.toLowerCase()}?`)}
                className="px-3 py-1.5 text-xs bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
              >
                {topic}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAssistant;
