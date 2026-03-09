"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { STOCKS, SECTORS } from "@/lib/mockData";
import Link from "next/link";
import { FaFilter, FaSearch, FaArrowRight, FaSortAmountDown } from "react-icons/fa";

export default function ScreenerPage() {
    const [search, setSearch] = useState("");
    const [sectorFilter, setSectorFilter] = useState("All");
    const [peFilter, setPeFilter] = useState("All");
    const [epsFilter, setEpsFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");

    const filtered = useMemo(() => {
        return STOCKS.filter((s) => {
            const matchSearch = s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase());
            const matchSector = sectorFilter === "All" || s.sector === sectorFilter;

            let matchPe = true;
            if (peFilter === "Low (<15)") matchPe = s.pe < 15;
            else if (peFilter === "Mid (15-30)") matchPe = s.pe >= 15 && s.pe <= 30;
            else if (peFilter === "High (>30)") matchPe = s.pe > 30;

            let matchEps = true;
            if (epsFilter === "Positive") matchEps = s.eps > 0;
            else if (epsFilter === "High (>40)") matchEps = s.eps > 40;

            let matchPrice = true;
            if (priceFilter === "<500") matchPrice = s.ltp < 500;
            else if (priceFilter === "500-1000") matchPrice = s.ltp >= 500 && s.ltp <= 1000;
            else if (priceFilter === ">1000") matchPrice = s.ltp > 1000;

            return matchSearch && matchSector && matchPe && matchEps && matchPrice;
        });
    }, [search, sectorFilter, peFilter, epsFilter, priceFilter]);

    return (
        <div className="flex h-[calc(100vh-82px)] overflow-hidden" style={{ background: "var(--background)" }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                Stock <span className="gradient-text">Screener</span>
                            </h1>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                Filter stocks based on fundamental and technical criteria
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--brand-glow)] text-[var(--brand-light)] border border-[var(--brand-bright)]">
                                {filtered.length} Results
                            </span>
                            <button className="btn-primary px-4 py-2 text-xs font-bold flex items-center gap-2">
                                Save Presets
                            </button>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="card p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter ml-1">Search</label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-3 h-3" />
                                    <input
                                        type="text"
                                        placeholder="Search symbol..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none text-xs"
                                        style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter ml-1">Sector</label>
                                <select
                                    value={sectorFilter}
                                    onChange={(e) => setSectorFilter(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none text-xs appearance-none cursor-pointer"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                >
                                    <option value="All">All Sectors</option>
                                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter ml-1">P/E Ratio</label>
                                <select
                                    value={peFilter}
                                    onChange={(e) => setPeFilter(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none text-xs appearance-none cursor-pointer"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                >
                                    <option value="All">Any P/E</option>
                                    <option value="Low (<15)">Low (&lt;15)</option>
                                    <option value="Mid (15-30)">Mid (15-30)</option>
                                    <option value="High (>30)">High (&gt;30)</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter ml-1">EPS</label>
                                <select
                                    value={epsFilter}
                                    onChange={(e) => setEpsFilter(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none text-xs appearance-none cursor-pointer"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                >
                                    <option value="All">Any EPS</option>
                                    <option value="Positive">Positive Only</option>
                                    <option value="High (>40)">High (&gt;40)</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter ml-1">Price Range</label>
                                <select
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none text-xs appearance-none cursor-pointer"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                >
                                    <option value="All">Any Price</option>
                                    <option value="<500">Under 500</option>
                                    <option value="500-1000">500 - 1000</option>
                                    <option value=">1000">Above 1000</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="card overflow-x-auto min-h-[400px]">
                        <table className="w-full text-xs">
                            <thead className="border-b border-[var(--border)]">
                                <tr className="text-[var(--text-muted)] uppercase font-bold tracking-tight">
                                    <th className="text-left pb-4 pl-2">Symbol</th>
                                    <th className="text-right pb-4">LTP</th>
                                    <th className="text-right pb-4">% Change</th>
                                    <th className="text-right pb-4">P/E</th>
                                    <th className="text-right pb-4">EPS</th>
                                    <th className="text-right pb-4">Market Cap (Cr)</th>
                                    <th className="text-right pb-4 pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {filtered.map((s) => (
                                    <tr key={s.symbol} className="table-row group">
                                        <td className="py-4 pl-2">
                                            <div>
                                                <p className="font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-light)] transition-colors">{s.symbol}</p>
                                                <p className="text-[10px] text-[var(--text-muted)] truncate max-w-[150px]">{s.name}</p>
                                            </div>
                                        </td>
                                        <td className="text-right font-mono font-bold text-[var(--text-primary)]">
                                            {s.ltp.toLocaleString()}
                                        </td>
                                        <td className="text-right font-mono">
                                            <span className={`px-2 py-0.5 rounded-md ${s.pctChange >= 0 ? "bg-[rgba(16,185,129,0.1)] text-positive" : "bg-[rgba(239,68,68,0.1)] text-negative"}`}>
                                                {s.pctChange >= 0 ? "+" : ""}{s.pctChange.toFixed(2)}%
                                            </span>
                                        </td>
                                        <td className="text-right font-mono text-[var(--text-primary)]">{s.pe.toFixed(2)}</td>
                                        <td className="text-right font-mono text-[var(--text-primary)]">{s.eps.toFixed(2)}</td>
                                        <td className="text-right font-mono text-[var(--text-secondary)]">{s.marketCap.toLocaleString()}</td>
                                        <td className="text-right pr-2">
                                            <Link href={`/stock/${s.symbol}`} className="inline-flex items-center gap-1.5 text-[var(--brand-light)] hover:underline font-bold">
                                                Analyze <FaArrowRight className="w-2 h-2" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
                                <FaFilter className="w-8 h-8 mb-4 opacity-20" />
                                <p>No stocks match your filters.</p>
                                <button onClick={() => { setSearch(""); setSectorFilter("All"); setPeFilter("All"); setEpsFilter("All"); setPriceFilter("All"); }} className="mt-2 text-[var(--brand-light)] font-bold hover:underline">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
