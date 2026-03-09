"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PricingCard from "@/components/PricingCard";
import {
  MARKET_SUMMARY,
  getTopGainers,
  getTopLosers,
} from "@/lib/mockData";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
    ),
    title: "Real-Time Market Data",
    desc: "Live NEPSE trading data with instant price updates, volume tracking, and market depth analysis.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>
    ),
    title: "Smart Stock Screener",
    desc: "Filter stocks by P/E, EPS, volume, sector, and more. Find hidden gems before the market catches on.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M20.66 8A10 10 0 0 0 16 3.34" /><path d="M20.66 8H16V3.34" /></svg>
    ),
    title: "Portfolio Tracker",
    desc: "Track your investments in real-time. See P&L, allocation, and WACC calculations at a glance.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
    ),
    title: "AI-Powered Insights",
    desc: "Our AI algorithm analyzes trends, fundamentals, and technicals to give you Buy/Sell/Hold signals.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    ),
    title: "Sector Heatmap",
    desc: "Visualize market sectors at a glance. See which sectors are hot and where money is flowing.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6M9 15l3 3 3-3" /></svg>
    ),
    title: "Financial Reports",
    desc: "Access company financials, balance sheets, profit & loss statements, and annual reports.",
  },
];

export default function HomePage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const topGainers = getTopGainers(5);
  const topLosers = getTopLosers(5);

  const plans = [
    {
      title: "Free",
      subtitle: "For casual investors",
      monthly: "Rs. 0",
      annual: "Rs. 0",
      features: [
        "1 Watchlist (5 stocks)",
        "Basic Charts",
        "Delayed Market Data",
        "Market News Feed",
      ],
    },
    {
      title: "Pro",
      subtitle: "For active traders",
      monthly: "Rs. 999",
      annual: "Rs. 9,999",
      features: [
        "Real-time Market Data",
        "Unlimited Watchlists",
        "Advanced Charting Tools",
        "AI Trade Signals",
        "Stock Screener",
        "Portfolio Analytics",
      ],
      highlight: true,
    },
    {
      title: "Elite",
      subtitle: "For power users & institutions",
      monthly: "Rs. 2,499",
      annual: "Rs. 24,999",
      features: [
        "Everything in Pro",
        "Full 20-Year Historical Data",
        "Advanced Screener & Alerts",
        "API Access",
        "Priority Support",
        "Custom Dashboards",
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-glow)] border border-[var(--brand)]/20 text-sm font-medium text-[var(--brand-light)] mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[var(--brand)] animate-pulse" />
            NEPSE Live — Market is Open
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            <span className="text-[var(--text-primary)]">
              Trade Smarter with
            </span>
            <br />
            <span className="gradient-text">AI Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
            Nepal&apos;s most powerful stock market platform. Real-time NEPSE data,
            AI-driven trade signals, portfolio tracking, and comprehensive
            market analysis — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <Link
              href="/dashboard"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2"
            >
              Open Dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/market"
              className="btn-secondary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2"
            >
              Explore Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Market Stats Bar */}
      <section className="relative border-y border-[var(--border)]" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "NEPSE Index",
              value: MARKET_SUMMARY.nepseIndex.toLocaleString(),
              change: MARKET_SUMMARY.nepseChangePercent,
            },
            {
              label: "Total Turnover",
              value: `Rs. ${MARKET_SUMMARY.totalTurnover} Cr`,
              change: 3.45,
            },
            {
              label: "Traded Shares",
              value: MARKET_SUMMARY.totalTradedShares.toLocaleString(),
              change: 8.12,
            },
            {
              label: "Transactions",
              value: MARKET_SUMMARY.totalTransactions.toLocaleString(),
              change: 5.67,
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p
                className={`text-sm font-semibold mt-0.5 ${stat.change >= 0 ? "text-positive" : "text-negative"
                  }`}
              >
                {stat.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(stat.change).toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Trade with Confidence</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              From real-time data to AI-powered recommendations, Arthanandi
              gives you the edge in the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="card hover-lift animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--brand-glow)", color: "var(--brand-light)" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Preview Section */}
      <section
        className="py-20 px-4 border-y border-[var(--border)]"
        style={{ background: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Today&apos;s <span className="gradient-text">Market Movers</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              See what&apos;s moving in the NEPSE market right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--positive)]" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Top Gainers
                </h3>
              </div>
              <div className="space-y-0">
                {topGainers.map((s, i) => (
                  <div key={s.symbol} className="flex items-center justify-between py-3 table-row px-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] w-5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] text-sm">
                          {s.symbol}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                          {s.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold text-sm text-[var(--text-primary)]">
                        {s.ltp.toLocaleString()}
                      </p>
                      <span className="badge badge-positive">
                        ▲ {s.pctChange.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--negative)]" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Top Losers
                </h3>
              </div>
              <div className="space-y-0">
                {topLosers.map((s, i) => (
                  <div key={s.symbol} className="flex items-center justify-between py-3 table-row px-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] w-5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] text-sm">
                          {s.symbol}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                          {s.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold text-sm text-[var(--text-primary)]">
                        {s.ltp.toLocaleString()}
                      </p>
                      <span className="badge badge-negative">
                        ▼ {Math.abs(s.pctChange).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/market"
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              View Full Market Data
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Choose a plan that fits your investing style. Cancel anytime.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center rounded-xl p-1 border border-[var(--border)]" style={{ background: "var(--surface)" }}>
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${!isAnnual
                  ? "bg-[var(--brand)] text-white shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isAnnual
                  ? "bg-[var(--brand)] text-white shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                Annual
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded bg-[var(--positive-bg)] text-[var(--positive)]">
                  Save 15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                subtitle={plan.subtitle}
                price={isAnnual ? plan.annual : plan.monthly}
                frequency={isAnnual ? "/year" : "/month"}
                features={plan.features}
                highlight={plan.highlight}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Ready to <span className="gradient-text">Start Trading Smarter?</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            Join thousands of Nepali investors who trust Arthanandi for their
            market intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2"
            >
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 px-4" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold gradient-text">Arthanandi</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Nepal&apos;s leading stock market intelligence platform powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">Platform</h4>
              <div className="space-y-2">
                {["Dashboard", "Markets", "Screener", "News"].map((item) => (
                  <p key={item} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">Company</h4>
              <div className="space-y-2">
                {["About", "Careers", "Blog", "Contact"].map((item) => (
                  <p key={item} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">Legal</h4>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Disclaimer"].map((item) => (
                  <p key={item} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">{item}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © 2026 Arthanandi. All rights reserved. Not financial advice.
            </p>
            <div className="flex items-center gap-4">
              {["Facebook", "Twitter", "LinkedIn"].map((social) => (
                <span key={social} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
