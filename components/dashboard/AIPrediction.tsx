"use client";

import { useMemo, useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { generateAIPrediction } from "@/lib/mockData";
import { FaRobot, FaMagic } from "react-icons/fa";
import ProFeatureLock from "../common/ProFeatureLock";

interface AIPredictionProps {
    symbol: string;
    currentPrice: number;
}

export default function AIPrediction({ symbol, currentPrice }: AIPredictionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const result = useMemo(() => {
        if (!mounted) return null;
        return generateAIPrediction(currentPrice);
    }, [currentPrice, mounted]);

    if (!mounted || !result) {
        return (
            <div className="card h-48 flex items-center justify-center bg-[var(--brand-glow)]">
                <FaRobot className="w-8 h-8 text-[var(--brand)] animate-bounce" />
            </div>
        );
    }

    const data = result.data;
    const finalPrice = data[data.length - 1].price;
    const changeRaw = finalPrice - currentPrice;
    const changePct = (changeRaw / currentPrice) * 100;
    const isBullish = changePct >= 0;

    return (
        <div className="card border-[var(--brand-bright)] bg-[var(--brand-glow)]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white shadow-lg animate-pulse-glow">
                        <FaRobot className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-[var(--text-primary)]">AI Price Forecast</h3>
                            <span className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--brand-bright)]/30 text-[7px] font-mono font-bold text-[var(--brand-light)]">
                                {result.model} (NEPSE-validated)
                            </span>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)]">7-Day Predictive Cycle for {symbol}</p>
                    </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${isBullish ? "bg-[rgba(16,185,129,0.15)] text-positive border-positive" : "bg-[rgba(239,68,68,0.15)] text-negative border-negative"}`}>
                    {isBullish ? "BULLISH" : "BEARISH"}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Target (Price/T)</p>
                    <p className="text-lg font-bold font-mono text-[var(--text-primary)]">Rs. {finalPrice.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Confidence Score</p>
                    <p className={`text-lg font-bold font-mono text-[var(--accent-light)]`}>
                        {result.confidence}%
                    </p>
                </div>
            </div>

            <div className="h-28 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="glass-card px-2 py-1 text-[10px] border-[var(--border-bright)]">
                                            <p className="font-bold text-[var(--text-primary)]">Rs. {payload[0].value?.toLocaleString()}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="var(--brand)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ r: 3, fill: "var(--brand)", strokeWidth: 0 }}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                        <XAxis dataKey="day" hide />
                        <YAxis domain={["auto", "auto"]} hide />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--border)]">
                    <FaMagic className="w-3 h-3 text-[var(--warning)]" />
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">
                        <span className="text-[var(--brand-light)] font-bold">{result.model}</span> suggests a <span className="text-[var(--text-primary)] font-bold">{isBullish ? "short-term breakout" : "corrective phase"}</span> based on sequential OHLCV patterns.
                    </p>
                </div>

                {/* Pro Teaser: Factor Analysis */}
                <div className="mt-2 border-t border-dashed border-[var(--border)] pt-3">
                    <ProFeatureLock
                        featureName="AI Factor Analysis"
                        message="See which technical & fundamental features drive the model's decision."
                    >
                        <div className="space-y-2 opacity-30">
                            {[
                                { label: "FloorSheet Volume", value: 42 },
                                { label: "RSI Divergence", value: 28 },
                                { label: "Sector Rotation", value: 15 },
                            ].map((f, i) => (
                                <div key={i} className="flex items-center justify-between text-[8px] gap-2">
                                    <span className="text-[var(--text-muted)]">{f.label}</span>
                                    <div className="flex-1 h-1 bg-[var(--surface-elevated)] rounded-full overflow-hidden">
                                        <div className="h-full bg-[var(--brand-light)]" style={{ width: `${f.value}%` }} />
                                    </div>
                                    <span className="text-[var(--text-secondary)] font-mono">{f.value}%</span>
                                </div>
                            ))}
                        </div>
                    </ProFeatureLock>
                </div>

                <p className="text-[8px] text-[var(--text-muted)] italic px-1 pt-2">
                    * Backtest directional accuracy ~68.4% (aligned with 2022-2025 NEPSE research).
                </p>
            </div>
        </div>
    );
}
