import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import ReturnsAnalysis from "@/components/dashboard/ReturnsAnalysis";
import VolatilityRisk from "@/components/dashboard/VolatilityRisk";
import TrendAnalysis from "@/components/dashboard/TrendAnalysis";
import RollingStatistics from "@/components/dashboard/RollingStatistics";
import DrawdownsShocks from "@/components/dashboard/DrawdownsShocks";
import MarketStressIndex from "@/components/dashboard/MarketStressIndex";
import RegimeDetection from "@/components/dashboard/RegimeDetection";
import MarketComparison from "@/components/dashboard/MarketComparison";
import InsightsSummary from "@/components/dashboard/InsightsSummary";
import AnalyticsAssistant from "@/components/dashboard/AnalyticsAssistant";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<MarketOverview />} />
        <Route path="returns" element={<ReturnsAnalysis />} />
        <Route path="volatility" element={<VolatilityRisk />} />
        <Route path="trends" element={<TrendAnalysis />} />
        <Route path="rolling" element={<RollingStatistics />} />
        <Route path="drawdowns" element={<DrawdownsShocks />} />
        <Route path="stress" element={<MarketStressIndex />} />
        <Route path="regimes" element={<RegimeDetection />} />
        <Route path="comparison" element={<MarketComparison />} />
        <Route path="insights" element={<InsightsSummary />} />
        <Route path="assistant" element={<AnalyticsAssistant />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
