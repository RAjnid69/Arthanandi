"use client";

import { useState, useEffect } from "react";
import { getTopGainers, getTopLosers, getMostActive, getAIScore } from "@/lib/mockData";
import Link from "next/link";
import ProBadge from "../common/ProBadge";

const TABS = ["Gainers", "Losers", "AI Hot Picks", "Most Active"] as const;
type Tab = (typeof TABS)[number];

export default function TopMovers() {
    const [tab, setTab] = useState<Tab>("Gainers");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stocks =
        tab === "Gainers"
            ? getTopGainers(8)
            : tab === "Losers"
                ? getTopLosers(8)
                : tab === "AI Hot Picks"
                    ? getTopGainers(15).slice(5, 13) // Simulate different picks
                    : getMostActive(8);

    const maxVal =
        tab === "Most Active"
            ? Math.max(...stocks.map((s) => s.volume))
            : Math.max(...stocks.map((s) => Math.abs(s.pctChange)));

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    Top Movers
                </h3>
                <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-[var(--border)]" style={{ background: "var(--surface-elevated)" }}>
                    {TABS.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${tab === t
                                ? t === "Losers"
                                    ? "bg-[var(--negative)] text-white"
                                    : "bg-[var(--brand)] text-white"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-1">
                {stocks.map((s, i) => {
                    const barWidth =
                        tab === "Most Active"
                            ? (s.volume / maxVal) * 100
                            : (Math.abs(s.pctChange) / maxVal) * 100;

                    return (
                        <Link
                            href={`/stock/${s.symbol}`}
                            key={s.symbol}
                            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[var(--surface-hover)] transition-all group"
                        >
                            <span className="text-xs font-mono text-[var(--text-muted)] w-4">
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-light)] transition-colors">
                                        {s.symbol}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-xs font-mono text-[var(--text-secondary)]">
                                                {s.ltp.toLocaleString()}
                                            </span>
                                            <div className="group/score relative">
                                                <span className="text-[9px] font-bold text-[var(--brand-light)] bg-[var(--brand-glow)] px-1 rounded uppercase tracking-tighter cursor-help border border-[var(--brand-bright)]/30">
                                                    AI Score: {mounted ? getAIScore(s.symbol) : "--"}
                                                </span>
                                                <div className="absolute bottom-full right-0 mb-2 w-56 p-2 rounded-xl glass-card text-[9px] text-[var(--text-secondary)] opacity-0 group-hover/score:opacity-100 transition-opacity pointer-events-none z-50 border border-[var(--brand-bright)]/20 shadow-xl">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <p className="font-bold text-[var(--brand-light)]">XGBoost Ensemble v4</p>
                                                        <span className="text-[8px] bg-[var(--brand-glow)] px-1 rounded border border-[var(--brand-bright)]/30">Acc: ~65%</span>
                                                    </div>
                                                    <p className="mb-1.5 leading-relaxed">Calculated via XGBoost classifier. Top features: Volume Delta (+weight), RSI(14) Divergence, Sector Relative Strength.</p>
                                                    <div className="border-t border-[var(--border-bright)]/30 pt-1.5 mt-1.5">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="font-bold text-[var(--text-primary)]">Pro Detailed Breakdown</p>
                                                            <ProBadge />
                                                        </div>
                                                        <div className="space-y-1 opacity-40 blur-[2px] select-none">
                                                            <div className="flex justify-between items-center text-[7px]">
                                                                <span>FloorSheet Alpha</span>
                                                                <span className="font-mono">24.5%</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-[7px]">
                                                                <span>Institutional Flow</span>
                                                                <span className="font-mono">18.2%</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-[7px] text-[var(--brand-light)] mt-1.5 font-bold hover:underline cursor-pointer">Upgrade to unlock full feature importance &rarr;</p>
                                                    </div>
                                                    <p className="text-[8px] text-[var(--text-muted)] italic mt-1.5">Aimed at directional returns; aligned with recent 2025 NEPSE log-return studies.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span
                                            className={`badge text-[10px] min-w-[60px] text-center ${tab === "Most Active"
                                                ? "badge-neutral"
                                                : s.pctChange >= 0
                                                    ? "badge-positive"
                                                    : "badge-negative"
                                                }`}
                                        >
                                            {tab === "Most Active"
                                                ? s.volume.toLocaleString()
                                                : `${s.pctChange >= 0 ? "▲" : "▼"} ${Math.abs(s.pctChange).toFixed(2)}%`}
                                        </span>
                                    </div>
                                </div>
                                {/* Mini bar */}
                                <div className="h-1 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${barWidth}%`,
                                            background:
                                                tab === "Losers"
                                                    ? "var(--negative)"
                                                    : tab === "Most Active"
                                                        ? "var(--accent)"
                                                        : "var(--positive)",
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
