"use client";

import { PORTFOLIO_HOLDINGS } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

export default function PortfolioSummary() {
    const holdings = PORTFOLIO_HOLDINGS.map((h) => ({
        ...h,
        currentValue: h.currentPrice * h.quantity,
        investedValue: h.avgCost * h.quantity,
        pl: (h.currentPrice - h.avgCost) * h.quantity,
        plPercent: ((h.currentPrice - h.avgCost) / h.avgCost) * 100,
    }));

    const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
    const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
    const totalPL = totalValue - totalInvested;
    const totalPLPercent = (totalPL / totalInvested) * 100;

    // Group by sector for pie chart
    const sectorData = holdings.reduce(
        (acc, h) => {
            const existing = acc.find((a) => a.name === h.sector);
            if (existing) {
                existing.value += h.currentValue;
            } else {
                acc.push({ name: h.sector, value: h.currentValue });
            }
            return acc;
        },
        [] as { name: string; value: number }[]
    );

    return (
        <div className="card">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Portfolio Summary
            </h3>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-xl" style={{ background: "var(--surface-elevated)" }}>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Total Value
                    </p>
                    <p className="text-lg font-bold font-mono text-[var(--text-primary)]">
                        Rs. {(totalValue / 1000).toFixed(1)}K
                    </p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "var(--surface-elevated)" }}>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        Invested
                    </p>
                    <p className="text-lg font-bold font-mono text-[var(--text-primary)]">
                        Rs. {(totalInvested / 1000).toFixed(1)}K
                    </p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: totalPL >= 0 ? "var(--positive-bg)" : "var(--negative-bg)" }}>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                        P&L
                    </p>
                    <p className={`text-lg font-bold font-mono ${totalPL >= 0 ? "text-positive" : "text-negative"}`}>
                        {totalPL >= 0 ? "+" : ""}{(totalPL / 1000).toFixed(1)}K
                    </p>
                    <p className={`text-[10px] font-semibold ${totalPL >= 0 ? "text-positive" : "text-negative"}`}>
                        {totalPLPercent >= 0 ? "▲" : "▼"} {Math.abs(totalPLPercent).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Allocation Chart */}
            <div className="flex items-center gap-4">
                <div className="w-28 h-28 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sectorData}
                                cx="50%"
                                cy="50%"
                                innerRadius={28}
                                outerRadius={45}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {sectorData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => `Rs. ${(value / 1000).toFixed(1)}K`}
                                contentStyle={{
                                    background: "var(--surface-elevated)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1.5">
                    {sectorData.map((s, i) => (
                        <div key={s.name} className="flex items-center gap-2 text-xs">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                            <span className="text-[var(--text-secondary)] flex-1 truncate">{s.name}</span>
                            <span className="text-[var(--text-primary)] font-mono">
                                {((s.value / totalValue) * 100).toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Holdings Table */}
            <div className="mt-4 space-y-0">
                {holdings.map((h) => (
                    <div key={h.symbol} className="flex items-center justify-between py-2 table-row px-1 rounded-lg">
                        <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{h.symbol}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">{h.quantity} shares</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono text-[var(--text-primary)]">
                                Rs. {h.currentValue.toLocaleString()}
                            </p>
                            <p className={`text-[10px] font-mono font-semibold ${h.pl >= 0 ? "text-positive" : "text-negative"}`}>
                                {h.pl >= 0 ? "+" : ""}Rs. {h.pl.toLocaleString()} ({h.plPercent >= 0 ? "▲" : "▼"}{Math.abs(h.plPercent).toFixed(1)}%)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
