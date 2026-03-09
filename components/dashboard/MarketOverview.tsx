"use client";

import { MARKET_SUMMARY } from "@/lib/mockData";

const CARDS = [
    {
        label: "NEPSE Index",
        value: MARKET_SUMMARY.nepseIndex,
        change: MARKET_SUMMARY.nepseChangePercent,
        aiForecast: { change: 2.4, confidence: 68 },
        prefix: "",
        suffix: "",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
        ),
    },
    {
        label: "Total Turnover",
        value: MARKET_SUMMARY.totalTurnover,
        change: 3.45,
        aiForecast: { message: "Unusual activity" },
        prefix: "Rs. ",
        suffix: " Cr",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><circle cx="12" cy="14" r="2" /></svg>
        ),
    },
    {
        label: "Traded Shares",
        value: MARKET_SUMMARY.totalTradedShares,
        change: 8.12,
        prefix: "",
        suffix: "",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m7 16 4-8 4 4 6-6" /></svg>
        ),
    },
    {
        label: "Transactions",
        value: MARKET_SUMMARY.totalTransactions,
        change: 5.67,
        prefix: "",
        suffix: "",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
        ),
    },
];

export default function MarketOverview() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CARDS.map((card, i) => (
                <div
                    key={card.label}
                    className="card hover-lift animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                >
                    <div className="flex items-start justify-between mb-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: card.change >= 0 ? "var(--positive-bg)" : "var(--negative-bg)",
                                color: card.change >= 0 ? "var(--positive)" : "var(--negative)",
                            }}
                        >
                            {card.icon}
                        </div>
                        <span
                            className={`badge ${card.change >= 0 ? "badge-positive" : "badge-negative"
                                }`}
                        >
                            {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change).toFixed(2)}%
                        </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        {card.label}
                    </p>
                    <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                        {card.prefix}
                        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
                        {card.suffix}
                    </p>

                    {card.aiForecast && (
                        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                            {card.aiForecast.message ? (
                                <span className="text-[10px] font-bold text-[var(--warning)] uppercase tracking-tighter animate-pulse">
                                    ⚠️ {card.aiForecast.message}
                                </span>
                            ) : (
                                <>
                                    <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-tight">AI 7-Day Forecast</span>
                                    <span className="text-[10px] font-bold text-[var(--brand-light)]">
                                        +{card.aiForecast.change}% ({card.aiForecast.confidence}%)
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
