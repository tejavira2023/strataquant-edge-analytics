import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  accentBorder?: boolean;
}

export const MetricCard = ({
  title,
  value,
  subtitle,
  trend,
  accentBorder = false,
}: MetricCardProps) => {
  const trendColor = trend === "up" 
    ? "text-chart-success" 
    : trend === "down" 
    ? "text-chart-danger" 
    : "text-muted-foreground";

  return (
    <div className={`card-metric ${accentBorder ? "border-accent-left" : ""}`}>
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
        {title}
      </p>
      <p className={`text-3xl font-bold font-data ${trendColor}`}>{value}</p>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const ChartContainer = ({
  title,
  subtitle,
  children,
}: ChartContainerProps) => {
  return (
    <div className="card-chart">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

interface InterpretationPanelProps {
  title?: string;
  children: ReactNode;
}

export const InterpretationPanel = ({
  title = "Interpretation",
  children,
}: InterpretationPanelProps) => {
  return (
    <div className="card-metric border-accent-left bg-secondary/30">
      <h4 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
        {title}
      </h4>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface RegimeBadgeProps {
  regime: "Stable" | "Volatile" | "Crisis";
}

export const RegimeBadge = ({ regime }: RegimeBadgeProps) => {
  const className = regime === "Stable" 
    ? "regime-stable" 
    : regime === "Volatile" 
    ? "regime-volatile" 
    : "regime-crisis";
  
  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider ${className}`}>
      {regime}
    </span>
  );
};
