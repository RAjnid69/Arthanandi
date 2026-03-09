"use client";

import { useMemo, useState, useEffect } from "react";
import { STOCKS, generateHistoricalData } from "@/lib/mockData";
import { detectPatterns } from "@/lib/technicalAnalysis";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function PatternScanner() {
    const [mounted, setMounted] = useState(false);
    const [filterType, setFilterType] = useState<"all" | "bullish" | "bearish">("all");

    useEffect(() => {
        setMounted(true);
    }, []);

    const allPatterns = useMemo(() => {
        if (!mounted) return [];
        const results: { symbol: string; name: string; pattern: ReturnType<typeof detectPatterns>[0] }[] = [];
        STOCKS.forEach(s => {
            const hist = generateHistoricalData(s.ltp, 60);
            const prices = hist.map(h => h.price);
            const detected = detectPatterns(prices, s.symbol);
            detected.forEach(p => {
                results.push({ symbol: s.symbol, name: s.name, pattern: p });
            });
        });
        return results.sort((a, b) => b.pattern.confidence - a.pattern.confidence);
    }, [mounted]);

    if (!mounted) {
        return (
            <div className="card h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-[var(--surface-elevated)] border-t-[var(--brand)] animate-spin" />
            </div>
        );
    }

    const filtered = filterType === "all"
        ? allPatterns
        : allPatterns.filter(p => p.pattern.type === filterType);

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-glow)", color: "var(--accent-light)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">Pattern Scanner</h3>
                            <span className="px-1.5 py-0.5 rounded bg-[var(--accent-glow)] border border-[var(--accent-light)]/30 text-[8px] font-mono font-bold text-[var(--accent-light)]">
                                CNN-1D Engine
                            </span>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)]">Convolutional Neural Network (CNN) 1D Time-Series Analysis</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-1 p-1 rounded-lg border border-[var(--border)] mb-4" style={{ background: "var(--surface-elevated)" }}>
                {(["all", "bullish", "bearish"] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilterType(f)}
                        className={`flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${filterType === f
                            ? f === "bullish" ? "bg-[rgba(16,185,129,0.15)] text-positive" :
                                f === "bearish" ? "bg-[rgba(239,68,68,0.15)] text-negative" :
                                    "bg-[var(--brand)] text-white"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        {f} ({f === "all" ? allPatterns.length : allPatterns.filter(p => p.pattern.type === f).length})
                    </button>
                ))}
            </div>

            {/* Pattern list */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filtered.slice(0, 10).map((item, i) => (
                    <Link
                        key={`${item.symbol}-${item.pattern.pattern}-${i}`}
                        href={`/stock/${item.symbol}`}
                        className="block p-3 rounded-xl border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)] transition-all group"
                    >
                        <div className="flex items-start justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-light)] transition-colors">
                                    {item.symbol}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${item.pattern.type === "bullish"
                                    ? "bg-[rgba(16,185,129,0.1)] text-positive"
                                    : item.pattern.type === "bearish"
                                        ? "bg-[rgba(239,68,68,0.1)] text-negative"
                                        : "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]"
                                    }`}>
                                    {item.pattern.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[8px] font-bold text-[var(--accent-light)] px-1 rounded bg-[var(--accent-glow)] border border-[var(--accent-light)]/20 uppercase">
                                    CNN Confidence
                                </span>
                                <div className="w-12 h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${item.pattern.confidence}%`,
                                            background: item.pattern.confidence > 75 ? "#10b981" : item.pattern.confidence > 60 ? "#f59e0b" : "#ef4444",
                                        }}
                                    />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                                    {item.pattern.confidence}%
                                </span>
                            </div>
                        </div>

                        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-1">
                            {item.pattern.pattern}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                            {item.pattern.description}
                        </p>

                        {item.pattern.priceTarget && (
                            <div className="mt-1.5 flex items-center gap-2 text-[10px]">
                                <span className="text-[var(--text-muted)]">Target:</span>
                                <span className="font-mono font-bold text-[var(--text-primary)]">
                                    Rs. {item.pattern.priceTarget.toLocaleString()}
                                </span>
                                <FaArrowRight className="w-2 h-2 text-[var(--brand-light)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
