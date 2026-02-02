import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Shield, Activity, Layers, LineChart } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">StrataQuant</span>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase border border-accent/30 text-accent bg-accent/5">
              Quantitative Analytics Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Quantifying Market Stress, Risk, and Regimes
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              A structured analytics platform for measuring market behavior, volatility trends, 
              and regime changes across global indices. Built for institutional-grade analysis.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="xl">
                Enter Analytics Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What StrataQuant Does */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-12">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-bold mt-2">What StrataQuant Does</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border border-border">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border bg-card">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Market Stress Measurement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Composite stress indices derived from volatility, drawdowns, and momentum 
                instability. Real-time monitoring of market health.
              </p>
            </div>
            
            <div className="p-8 border-b md:border-b-0 md:border-r border-border bg-card">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Trend and Regime Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identify market phases through statistical clustering and regime-switching 
                models. Classify periods as Stable, Volatile, or Crisis.
              </p>
            </div>
            
            <div className="p-8 bg-card">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Risk and Volatility Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rolling volatility metrics, Value-at-Risk calculations, and drawdown 
                analysis for comprehensive risk assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-12">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Methodology
            </span>
            <h2 className="text-3xl font-bold mt-2">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-6xl font-bold text-accent/20 absolute -top-4 -left-2">01</div>
              <div className="relative pt-8">
                <h3 className="text-lg font-semibold mb-3">Market Data Ingestion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Historical price data from major indices is collected and preprocessed 
                  for consistent time-series analysis.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-6xl font-bold text-accent/20 absolute -top-4 -left-2">02</div>
              <div className="relative pt-8">
                <h3 className="text-lg font-semibold mb-3">Feature Engineering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Returns, volatility, moving averages, and composite metrics are 
                  calculated using established quantitative methods.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="text-6xl font-bold text-accent/20 absolute -top-4 -left-2">03</div>
              <div className="relative pt-8">
                <h3 className="text-lg font-semibold mb-3">Visual Interpretation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Interactive charts and metrics dashboards translate complex data 
                  into actionable market intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Covered */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-12">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Analytics Suite
            </span>
            <h2 className="text-3xl font-bold mt-2">Metrics Covered</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-border">
            {[
              { name: 'Returns', icon: LineChart },
              { name: 'Volatility', icon: Activity },
              { name: 'Drawdowns', icon: TrendingUp },
              { name: 'Moving Averages', icon: Layers },
              { name: 'Stress Index', icon: BarChart3 },
              { name: 'Market Regimes', icon: Shield },
            ].map((metric, idx) => (
              <div 
                key={metric.name} 
                className={`p-6 bg-card flex flex-col items-center text-center ${
                  idx < 5 ? 'border-r border-border' : ''
                }`}
              >
                <metric.icon className="w-8 h-8 text-accent mb-3" />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Analyzing Market Behavior
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Explore our comprehensive analytics suite for institutional-grade market insights.
          </p>
          <Link to="/dashboard">
            <Button 
              variant="hero" 
              size="xl"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Enter Analytics Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-semibold">StrataQuant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Quantitative Market Analytics Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
