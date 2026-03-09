"use client";

import { useMemo, useState, useEffect } from "react";
import { STOCKS, generateHistoricalData } from "@/lib/mockData";
import { calculateMarketSentiment } from "@/lib/technicalAnalysis";
import { FaCompass, FaExclamationTriangle } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ProFeatureLock from "../common/ProFeatureLock";
import ProBadge from "../common/ProBadge";

export default function SentimentGauge() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sentiment = useMemo(() => {
        if (!mounted) return null;
        const allPrices = STOCKS.slice(0, 10).map(s => {
            const hist = generateHistoricalData(s.ltp, 30);
            return {
                symbol: s.symbol,
                prices: hist.map(h => h.price),
                volumes: hist.map(h => h.volume),
            };
        });
        return calculateMarketSentiment(allPrices);
    }, [mounted]);

    if (!mounted || !sentiment) {
        return (
            <div className="card h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-4 border-[var(--surface-elevated)] border-t-[var(--brand)] animate-spin" />
                    <p className="text-xs text-[var(--text-muted)] animate-pulse">Analyzing Market Sentiment...</p>
                </div>
            </div>
        );
    }

    // Calculate needle rotation: -90deg (fear) to +90deg (greed)
    const needleAngle = ((sentiment.overall / 100) * 180) - 90;

    const colorForValue = (v: number) => {
        if (v >= 75) return "#10b981";
        if (v >= 55) return "#34d399";
        if (v >= 45) return "#f59e0b";
        if (v >= 25) return "#f87171";
        return "#ef4444";
    };

    return (
        <div className="card">
            <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: "var(--accent-glow)", color: "var(--accent-light)" }}>
                    <FaCompass className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Market Sentiment</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">Fear & Greed Index — Updated Live</p>
                </div>
            </div>

            {/* Gauge */}
            <div className="flex justify-center mb-4">
                <div className="relative w-48 h-28">
                    {/* Arc background */}
                    <svg viewBox="0 0 200 110" className="w-full h-full">
                        <defs>
                            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="25%" stopColor="#f87171" />
                                <stop offset="50%" stopColor="#f59e0b" />
                                <stop offset="75%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                        {/* Gauge arc */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="url(#gaugeGrad)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Tick marks */}
                        {[0, 25, 50, 75, 100].map(v => {
                            const angle = ((v / 100) * 180 - 180) * (Math.PI / 180);
                            const x1 = 100 + 68 * Math.cos(angle);
                            const y1 = 100 + 68 * Math.sin(angle);
                            const x2 = 100 + 78 * Math.cos(angle);
                            const y2 = 100 + 78 * Math.sin(angle);
                            return <line key={v} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />;
                        })}
                        {/* Needle */}
                        <g transform={`rotate(${needleAngle}, 100, 100)`}>
                            <line x1="100" y1="100" x2="100" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="100" cy="100" r="5" fill="white" />
                        </g>
                    </svg>
                    {/* Center value */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                        <span className="text-3xl font-bold font-mono" style={{ color: colorForValue(sentiment.overall) }}>
                            {sentiment.overall}
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-center mb-5">
                <span
                    className="inline-flex px-3 py-1 rounded-full text-xs font-bold border"
                    style={{
                        color: colorForValue(sentiment.overall),
                        borderColor: colorForValue(sentiment.overall),
                        background: `${colorForValue(sentiment.overall)}15`,
                    }}
                >
                    {sentiment.label}
                </span>
            </div>

            {/* Factor breakdown */}
            <div className="space-y-2.5 mb-6">
                {sentiment.factors.map((f) => (
                    <div key={f.name} className="flex items-center gap-3">
                        <span className="text-[10px] text-[var(--text-muted)] w-24 shrink-0">{f.name}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${f.value}%`,
                                    background: f.signal === "bullish" ? "#10b981" : f.signal === "bearish" ? "#ef4444" : "#f59e0b",
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-mono font-bold w-8 text-right" style={{ color: colorForValue(f.value) }}>
                            {f.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Pro Teaser: Volatility Forecast */}
            <div className="border-t border-dashed border-[var(--border)] pt-5">
                <ProFeatureLock
                    featureName="30-Day Volatility Forecast"
                    message="Anticipate market turbulence before it happens with Artha-Predictive Vix."
                >
                    <div className="h-24 opacity-20 scale-[0.98]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { day: 1, v: 12 }, { day: 2, v: 15 }, { day: 3, v: 28 },
                                { day: 4, v: 22 }, { day: 5, v: 18 }, { day: 6, v: 35 }, { day: 7, v: 42 }
                            ]}>
                                <Area type="monotone" dataKey="v" stroke="var(--accent)" fill="var(--accent-glow)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-between mt-2 px-1 opacity-40">
                        <div className="flex items-center gap-1.5">
                            <FaExclamationTriangle className="w-2.5 h-2.5 text-[var(--warning)]" />
                            <span className="text-[9px] font-bold text-[var(--text-primary)] uppercase">Early Warning</span>
                        </div>
                        <span className="text-[9px] font-mono text-[var(--text-muted)]">Peak Expected: T+14d</span>
                    </div>
                </ProFeatureLock>
            </div>
        </div>
    );
}
