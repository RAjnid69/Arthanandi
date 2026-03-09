"use client";

import { useMemo, useState, useEffect } from "react";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
} from "recharts";
import { generateHistoricalData } from "@/lib/mockData";
import { analyzeStock } from "@/lib/technicalAnalysis";

interface TechnicalRadarProps {
    symbol: string;
    currentPrice: number;
}

export default function TechnicalRadar({ symbol, currentPrice }: TechnicalRadarProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const analysis = useMemo(() => {
        if (!mounted) return null;
        const hist = generateHistoricalData(currentPrice, 200);
        const prices = hist.map(h => h.price);
        const volumes = hist.map(h => h.volume);
        return analyzeStock(prices, volumes);
    }, [currentPrice, mounted]);

    if (!mounted || !analysis) {
        return (
            <div className="card h-64 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-[var(--surface-elevated)] border-t-[var(--brand)] animate-spin" />
            </div>
        );
    }

    const radarData = [
        { axis: "RSI", value: analysis.rsi, fullMark: 100 },
        { axis: "MACD", value: Math.min(Math.max(50 + analysis.macd.histogram * 5, 0), 100), fullMark: 100 },
        { axis: "Bollinger", value: Math.min(analysis.bollingerBands.width * 5, 100), fullMark: 100 },
        { axis: "Volume", value: analysis.volumeTrend === "increasing" ? 80 : analysis.volumeTrend === "decreasing" ? 30 : 55, fullMark: 100 },
        { axis: "Trend", value: currentPrice > analysis.sma50 ? 75 : 30, fullMark: 100 },
        { axis: "Score", value: analysis.score, fullMark: 100 },
    ];

    const signalColor =
        analysis.overallSignal === "Strong Buy" ? "#10b981" :
            analysis.overallSignal === "Buy" ? "#34d399" :
                analysis.overallSignal === "Neutral" ? "#f59e0b" :
                    analysis.overallSignal === "Sell" ? "#f87171" : "#ef4444";

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white shadow-lg">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">Technical Radar</h3>
                        <p className="text-[10px] text-[var(--text-muted)]">{symbol} Health Score</p>
                    </div>
                </div>
                <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                    style={{
                        color: signalColor,
                        borderColor: signalColor,
                        background: `${signalColor}15`,
                    }}
                >
                    {analysis.overallSignal}
                </span>
            </div>

            <div className="h-52 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.06)" />
                        <PolarAngleAxis
                            dataKey="axis"
                            tick={{ fill: "#64748b", fontSize: 10 }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name={symbol}
                            dataKey="value"
                            stroke={signalColor}
                            fill={signalColor}
                            fillOpacity={0.15}
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Score breakdown */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                    <p className="text-[10px] text-[var(--text-muted)]">Composite Score</p>
                    <p className="text-lg font-bold font-mono" style={{ color: signalColor }}>{analysis.score}/100</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                    <p className="text-[10px] text-[var(--text-muted)]">RSI (14)</p>
                    <p className={`text-lg font-bold font-mono ${analysis.rsi > 70 ? "text-negative" : analysis.rsi < 30 ? "text-positive" : "text-[var(--text-primary)]"}`}>
                        {analysis.rsi}
                    </p>
                </div>
            </div>
        </div>
    );
}
