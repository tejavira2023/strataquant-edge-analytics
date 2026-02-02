import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BarChart3,
  TrendingUp,
  LineChart,
  Layers,
  AlertTriangle,
  Gauge,
  Grid3X3,
  GitCompare,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  { path: "/dashboard/overview", label: "Market Overview", icon: BarChart3 },
  { path: "/dashboard/returns", label: "Returns Analysis", icon: LineChart },
  { path: "/dashboard/volatility", label: "Volatility and Risk", icon: Activity },
  { path: "/dashboard/trends", label: "Trend Analysis", icon: TrendingUp },
  { path: "/dashboard/rolling", label: "Rolling Statistics", icon: Layers },
  { path: "/dashboard/drawdowns", label: "Drawdowns and Shocks", icon: AlertTriangle },
  { path: "/dashboard/stress", label: "Market Stress Index", icon: Gauge },
  { path: "/dashboard/regimes", label: "Regime Detection", icon: Grid3X3 },
  { path: "/dashboard/comparison", label: "Market Comparison", icon: GitCompare },
  { path: "/dashboard/insights", label: "Insights Summary", icon: FileText },
  { path: "/dashboard/assistant", label: "Analytics Assistant", icon: MessageSquare },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-sidebar-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold text-sidebar-foreground tracking-tight">
                StrataQuant
              </span>
            </Link>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-sidebar-primary flex items-center justify-center mx-auto">
              <Activity className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "navActive" : "nav"}
                      className={`w-full ${collapsed ? "justify-center px-2" : ""}`}
                      size="sm"
                    >
                      <item.icon className={`w-4 h-4 ${collapsed ? "" : "mr-2"}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Index:</span>
              <select className="bg-secondary border-0 text-sm font-medium px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring">
                <option>BSE Sensex</option>
                <option>S&P 500</option>
                <option>NIFTY 50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date Range:</span>
              <select className="bg-secondary border-0 text-sm font-medium px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Last 100 Days</option>
                <option>Last 6 Months</option>
                <option>Last 1 Year</option>
                <option>Last 2 Years</option>
              </select>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Data as of: Jan 15, 2024
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
