"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import MarketOverview from "@/components/dashboard/MarketOverview";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import MarketTable from "@/components/dashboard/MarketTable";
import TopMovers from "@/components/dashboard/TopMovers";
import SectorHeatmap from "@/components/dashboard/SectorHeatmap";
import NewsWidget from "@/components/dashboard/NewsWidget";
import WatchlistWidget from "@/components/dashboard/WatchlistWidget";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import AIInsights from "@/components/dashboard/AIInsights";
import SentimentGauge from "@/components/dashboard/SentimentGauge";
import PatternScanner from "@/components/dashboard/PatternScanner";
import AIDailyBriefing from "@/components/dashboard/AIDailyBriefing";
import RiskQuiz from "@/components/onboarding/RiskQuiz";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("artnanandi_risk_profile");
    if (!profile) {
      setShowQuiz(true);
    }
  }, []);

  const handleQuizComplete = (profile: any) => {
    localStorage.setItem("artnanandi_risk_profile", JSON.stringify(profile));
    setShowQuiz(false);
  };

  return (
    <div className="flex h-[calc(100vh-82px)] overflow-hidden" style={{ background: "var(--background)" }}>
      {showQuiz && <RiskQuiz onComplete={handleQuizComplete} />}
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Phase 5: AI Daily Briefing (Pinned Top) */}
          <div id="ai-briefing">
            <AIDailyBriefing />
          </div>

          {/* Market Overview Cards */}
          <div id="overview">
            <MarketOverview />
          </div>

          {/* Core Loop Row: Chart + Market Movers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div id="movers" className="lg:col-span-8 space-y-6">
              <PerformanceChart />
              <div id="all-stocks">
                <MarketTable />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <TopMovers />
              <div id="ai-intelligence" className="space-y-6">
                <SentimentGauge />
                <AIInsights />
                <PatternScanner />
              </div>
            </div>
          </div>

          {/* Secondary Data Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="sectors">
              <SectorHeatmap />
            </div>
            <div id="watchlist">
              <WatchlistWidget />
            </div>
            <div id="portfolio">
              <PortfolioSummary />
            </div>
          </div>

          {/* News Row */}
          <div id="news" className="grid grid-cols-1 gap-6">
            <NewsWidget />
          </div>

          <footer className="mt-12 py-6 border-t border-[var(--border)] opacity-60">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed max-w-2xl text-center md:text-left">
                Arthanandi AI features use an ensemble of **LSTM**, **XGBoost**, **CNN**, and **Multilingual Transformer (XLM-R)** architectures —
                continuously researched and validated against 2022–2026 NEPSE historical data.
              </p>
              <a href="/ai-methodology" className="px-3 py-1 rounded-full border border-[var(--border)] text-[9px] font-bold text-[var(--text-muted)] hover:text-[var(--brand-light)] hover:border-[var(--brand-bright)] transition-all">
                AI Methodology & Ethics
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
