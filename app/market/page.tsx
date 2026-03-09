"use client";

import { useState, useMemo } from "react";
import { STOCKS, SECTORS, SECTOR_DATA } from "@/lib/mockData";
import Link from "next/link";

type SortKey = "symbol" | "ltp" | "pctChange" | "volume" | "marketCap" | "pe" | "eps";
type SortDir = "asc" | "desc";

export default function MarketPage() {
    const [search, setSearch] = useState("");
    const [sector, setSector] = useState("All");
    const [sortKey, setSortKey] = useState<SortKey>("volume");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    };

    const filtered = useMemo(() => {
        let stocks = [...STOCKS];
        if (sector !== "All") {
            stocks = stocks.filter((s) => s.sector === sector);
        }
        if (search) {
            const q = search.toLowerCase();
            stocks = stocks.filter(
                (s) =>
                    s.symbol.toLowerCase().includes(q) ||
                    s.name.toLowerCase().includes(q)
            );
        }
        stocks.sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
            return sortDir === "asc"
                ? (aVal as number) - (bVal as number)
                : (bVal as number) - (aVal as number);
        });
        return stocks;
    }, [search, sector, sortKey, sortDir]);

    const columns: { key: SortKey; label: string; align?: string }[] = [
        { key: "symbol", label: "Symbol" },
        { key: "ltp", label: "LTP", align: "right" },
        { key: "pctChange", label: "% Change", align: "right" },
        { key: "volume", label: "Volume", align: "right" },
        { key: "marketCap", label: "Mkt Cap (Cr)", align: "right" },
        { key: "pe", label: "P/E", align: "right" },
        { key: "eps", label: "EPS", align: "right" },
    ];

    return (
        <div className="min-h-screen" style={{ background: "var(--background)" }}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Market <span className="gradient-text">Overview</span>
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        Complete NEPSE market data with sector performance
                    </p>
                </div>

                {/* Sector Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    {SECTOR_DATA.slice(0, 6).map((s) => (
                        <button
                            key={s.name}
                            onClick={() => setSector(s.name === sector ? "All" : s.name)}
                            className={`card text-left cursor-pointer transition-all ${sector === s.name
                                    ? "border-[var(--brand)] bg-[var(--brand-glow)]"
                                    : ""
                                }`}
                        >
                            <p className="text-xs text-[var(--text-muted)] truncate mb-1">
                                {s.name}
                            </p>
                            <p
                                className={`text-lg font-bold font-mono ${s.change >= 0 ? "text-positive" : "text-negative"
                                    }`}
                            >
                                {s.change >= 0 ? "+" : ""}
                                {s.change.toFixed(2)}%
                            </p>
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="card mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                            <input
                                type="text"
                                placeholder="Search by name or symbol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none"
                                style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                            />
                        </div>
                        <select
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            className="px-4 py-2.5 rounded-xl text-sm border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none appearance-none cursor-pointer"
                            style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                        >
                            <option value="All">All Sectors</option>
                            {SECTORS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Data Table */}
                <div className="card overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[var(--border)]">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`pb-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--text-secondary)] ${col.align === "right" ? "text-right" : "text-left"
                                            }`}
                                        onClick={() => handleSort(col.key)}
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            {col.label}
                                            {sortKey === col.key && (
                                                <span className="text-[var(--brand)]">
                                                    {sortDir === "asc" ? "↑" : "↓"}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.symbol} className="table-row group">
                                    <td className="py-3">
                                        <Link href={`/stock/${s.symbol}`} className="group-hover:text-[var(--brand-light)]">
                                            <span className="font-semibold text-[var(--text-primary)]">{s.symbol}</span>
                                            <span className="block text-[10px] text-[var(--text-muted)] max-w-[200px] truncate">
                                                {s.name}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="text-right font-mono font-semibold text-[var(--text-primary)]">
                                        {s.ltp.toLocaleString()}
                                    </td>
                                    <td className="text-right">
                                        <span className={`badge ${s.pctChange >= 0 ? "badge-positive" : "badge-negative"}`}>
                                            {s.pctChange >= 0 ? "▲" : "▼"} {Math.abs(s.pctChange).toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="text-right font-mono text-[var(--text-secondary)]">
                                        {s.volume.toLocaleString()}
                                    </td>
                                    <td className="text-right font-mono text-[var(--text-secondary)]">
                                        {s.marketCap.toLocaleString()}
                                    </td>
                                    <td className="text-right font-mono text-[var(--text-secondary)]">
                                        {s.pe.toFixed(2)}
                                    </td>
                                    <td className="text-right font-mono text-[var(--text-secondary)]">
                                        {s.eps.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-[var(--text-muted)]">
                            No stocks found. Try adjusting your filters.
                        </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
                        Showing {filtered.length} of {STOCKS.length} stocks
                    </div>
                </div>
            </div>
        </div>
    );
}
