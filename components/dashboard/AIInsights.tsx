"use client";

import { AI_INSIGHTS } from "@/lib/mockData";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";

function SignalBadge({ signal }: { signal: string }) {
    const styles: Record<string, string> = {
        "Strong Buy": "bg-[rgba(16,185,129,0.2)] text-[#34d399] border-[rgba(16,185,129,0.3)]",
        Buy: "bg-[rgba(16,185,129,0.1)] text-[#10b981] border-[rgba(16,185,129,0.2)]",
        Hold: "bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]",
        Sell: "bg-[rgba(239,68,68,0.1)] text-[#ef4444] border-[rgba(239,68,68,0.2)]",
        "Strong Sell": "bg-[rgba(239,68,68,0.2)] text-[#f87171] border-[rgba(239,68,68,0.3)]",
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${styles[signal] || ""}`}>
            {signal}
        </span>
    );
}

export default function AIInsights() {
    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: "var(--accent-glow)", color: "var(--accent-light)" }}>
                        <FaRobot className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                            AI Trade Signals
                        </h3>
                        <p className="text-[10px] text-[var(--text-muted)]">
                            Powered by Arthanandi AI Engine
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {AI_INSIGHTS.map((insight) => {
                    const upside = ((insight.targetPrice - insight.currentPrice) / insight.currentPrice) * 100;

                    return (
                        <Link
                            href={`/stock/${insight.symbol}`}
                            key={insight.id}
                            className="block p-3 rounded-xl border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)] transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--brand-light)] px-1 rounded bg-[var(--brand-glow)] border border-[var(--brand-bright)]/20">
                                            {insight.reasoning.includes("Sentiment") || insight.reasoning.includes("XLM-R") ? "[Sentiment Stream]" : "[Technical Stream]"}
                                        </span>
                                        <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-light)] transition-colors">
                                            {insight.symbol}
                                        </span>
                                    </div>
                                    <span className="text-xs text-[var(--text-muted)]">
                                        {insight.name}
                                    </span>
                                </div>
                                <SignalBadge signal={insight.signal} />
                            </div>

                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2 line-clamp-2">
                                {insight.reasoning}
                            </p>

                            <div className="flex items-center gap-4 text-xs">
                                <div>
                                    <span className="text-[var(--text-muted)]">Target: </span>
                                    <span className="font-mono font-semibold text-[var(--text-primary)]">
                                        Rs. {insight.targetPrice.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[var(--text-muted)]">Upside: </span>
                                    <span className={`font-mono font-semibold ${upside >= 0 ? "text-positive" : "text-negative"}`}>
                                        {upside >= 0 ? "+" : ""}{upside.toFixed(1)}%
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[var(--text-muted)]">Confidence: </span>
                                    <span className="font-mono font-semibold text-[var(--accent-light)]">
                                        {insight.confidence}%
                                    </span>
                                </div>
                                <span className="text-[var(--text-muted)] ml-auto">
                                    {insight.timeframe}
                                </span>
                            </div>

                            {/* Confidence bar */}
                            <div className="mt-2 h-1 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${insight.confidence}%`,
                                        background: "linear-gradient(90deg, var(--brand), var(--accent))",
                                    }}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
