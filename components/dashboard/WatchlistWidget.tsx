"use client";

import { useState } from "react";
import { STOCKS } from "@/lib/mockData";
import Link from "next/link";
import { FaStar, FaTimes, FaPlus } from "react-icons/fa";

const DEFAULT_WATCHLIST = ["NABIL", "GBIME", "NHPC", "NLIC", "HBL"];

export default function WatchlistWidget() {
    const [symbols, setSymbols] = useState(DEFAULT_WATCHLIST);
    const [showAdd, setShowAdd] = useState(false);
    const [addInput, setAddInput] = useState("");

    const watchlistStocks = symbols
        .map((sym) => STOCKS.find((s) => s.symbol === sym))
        .filter(Boolean);

    const handleAdd = () => {
        const sym = addInput.toUpperCase().trim();
        if (sym && !symbols.includes(sym) && STOCKS.find((s) => s.symbol === sym)) {
            setSymbols([...symbols, sym]);
            setAddInput("");
            setShowAdd(false);
        }
    };

    const handleRemove = (sym: string) => {
        setSymbols(symbols.filter((s) => s !== sym));
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-[var(--warning)]" />
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        Watchlist
                    </h3>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-light)] hover:bg-[var(--brand-glow)] transition-all"
                >
                    <FaPlus className="w-3 h-3" />
                </button>
            </div>

            {showAdd && (
                <div className="flex gap-2 mb-3 animate-slide-down">
                    <input
                        type="text"
                        value={addInput}
                        onChange={(e) => setAddInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        placeholder="Enter symbol..."
                        className="flex-1 px-3 py-1.5 rounded-lg text-xs border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none"
                        style={{
                            background: "var(--surface-elevated)",
                            color: "var(--text-primary)",
                        }}
                    />
                    <button onClick={handleAdd} className="btn-primary text-xs px-3 py-1.5">
                        Add
                    </button>
                </div>
            )}

            <div className="space-y-0">
                {watchlistStocks.map((s) => {
                    if (!s) return null;
                    return (
                        <div
                            key={s.symbol}
                            className="flex items-center justify-between py-2.5 px-1 table-row rounded-lg group"
                        >
                            <Link
                                href={`/stock/${s.symbol}`}
                                className="flex items-center gap-2 flex-1 min-w-0"
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: "var(--brand-glow)", color: "var(--brand-light)" }}>
                                    {s.symbol.slice(0, 2)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-light)] transition-colors">
                                        {s.symbol}
                                    </p>
                                    <p className="text-[10px] text-[var(--text-muted)] truncate">
                                        {s.name}
                                    </p>
                                </div>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">
                                        {s.ltp.toLocaleString()}
                                    </p>
                                    <span
                                        className={`text-[10px] font-mono font-semibold ${s.pctChange >= 0 ? "text-positive" : "text-negative"
                                            }`}
                                    >
                                        {s.pctChange >= 0 ? "▲" : "▼"} {Math.abs(s.pctChange).toFixed(2)}%
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemove(s.symbol);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--negative)] hover:bg-[var(--negative-bg)] transition-all"
                                >
                                    <FaTimes className="w-2.5 h-2.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {watchlistStocks.length === 0 && (
                <p className="text-center text-sm text-[var(--text-muted)] py-6">
                    Your watchlist is empty. Add stocks to track them.
                </p>
            )}
        </div>
    );
}
