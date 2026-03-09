"use client";

import { SECTOR_DATA } from "@/lib/mockData";

export default function SectorHeatmap() {
    const maxTurnover = Math.max(...SECTOR_DATA.map((s) => s.turnover));

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    Sector Performance
                </h3>
                <span className="text-xs text-[var(--text-muted)]">Today</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SECTOR_DATA.map((sector) => {
                    const intensity = Math.min(Math.abs(sector.change) * 15, 60);
                    const isPositive = sector.change >= 0;
                    const sizeRatio = 0.6 + (sector.turnover / maxTurnover) * 0.4;

                    return (
                        <div
                            key={sector.name}
                            className="relative rounded-xl p-3 border border-[var(--border)] overflow-hidden cursor-pointer hover:border-[var(--border-bright)] transition-all group"
                            style={{
                                background: isPositive
                                    ? `rgba(16, 185, 129, ${intensity / 100})`
                                    : `rgba(239, 68, 68, ${intensity / 100})`,
                                minHeight: `${sizeRatio * 80}px`,
                            }}
                        >
                            <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight mb-1">
                                {sector.name}
                            </p>
                            <p
                                className={`text-lg font-bold font-mono ${isPositive ? "text-positive" : "text-negative"
                                    }`}
                            >
                                {isPositive ? "+" : ""}
                                {sector.change.toFixed(2)}%
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                                Rs. {sector.turnover} Cr
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
