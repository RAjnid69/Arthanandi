"use client";

import { useState, useEffect } from "react";
import { FaRobot, FaSyncAlt, FaExternalLinkAlt, FaLightbulb } from "react-icons/fa";

interface Insight {
    text: string;
    type: "positive" | "negative" | "neutral";
    link?: string;
}

export default function AIDailyBriefing() {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const insights: Insight[] = [
        { text: "NEPSE up 1.10% today. Your portfolio beat the index by 0.8% driven by NABIL rally.", type: "positive" },
        { text: "AI Technical Scanner flags AKPL as overbought (RSI: 78) — consider partial profit booking at Rs. 182.", type: "negative", link: "/stock/AKPL" },
        { text: "Unusual volume spike detected in Microfinance sector; potential breakout forming in CBBL.", type: "neutral", link: "/stock/CBBL" },
        { text: "Monetary policy review expected next week; AI sentiment remains cautiously bullish (68% confidence).", type: "neutral" }
    ];

    if (!mounted) {
        return (
            <div className="card h-40 animate-pulse bg-[var(--surface-elevated)]" />
        );
    }

    return (
        <div className="card border-[var(--brand-bright)] bg-gradient-to-br from-[var(--brand-glow)] to-transparent relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--brand)] opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.06] transition-opacity" />

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                {/* Robot Icon & Title */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg shadow-[var(--brand-glow)] animate-pulse-glow">
                        <FaRobot className="w-7 h-7" />
                    </div>
                    <div className="text-center space-y-1">
                        <span className="block text-[10px] font-bold text-[var(--brand-light)] uppercase tracking-tighter">Artha-Hybrid v4</span>
                        <span className="block text-[7px] text-[var(--text-muted)] font-mono uppercase tracking-widest opacity-70">LSTM | XGBoost | CNN | XLM-R</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-[var(--brand-glow)] border border-[var(--brand-bright)] text-[8px] font-bold text-[var(--brand-light)] uppercase tracking-widest animate-pulse">
                                    AI Morning Insight
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                                Good afternoon, <span className="gradient-text">Investor</span>
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                                &quot;LSTM-Attention Hybrid identifies a potential liquidity squeeze in Hydropower; watch the 2100 level on NEPSE Index.&quot;
                            </p>
                        </div>
                        <button
                            className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--brand-light)] hover:border-[var(--brand-bright)] transition-all active:scale-95"
                            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 800); }}
                        >
                            <FaSyncAlt className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {insights.map((insight, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--border)] hover:border-[var(--border-bright)] transition-all cursor-default group/item"
                            >
                                <div className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${insight.type === "positive" ? "bg-positive" :
                                    insight.type === "negative" ? "bg-negative" : "bg-warning"
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                                        {insight.text}
                                    </p>
                                    {insight.link && (
                                        <a href={insight.link} className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[var(--brand-light)] hover:underline opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            Deep Dive <FaExternalLinkAlt className="w-2 h-2" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tip / Action */}
                <div className="w-full md:w-56 p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--brand-bright)] border-dashed hidden lg:block">
                    <div className="flex items-center gap-2 mb-2">
                        <FaLightbulb className="w-3 h-3 text-[var(--warning)]" />
                        <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase">Smart Action</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-tight mb-3">
                        Based on your profile, AI suggests rebalancing towards **Finance** sector for better yield.
                    </p>
                    <button className="w-full py-2 rounded-lg bg-[var(--brand)] text-white text-[10px] font-bold hover:brightness-110 transition-all active:scale-95">
                        Optimize Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}
