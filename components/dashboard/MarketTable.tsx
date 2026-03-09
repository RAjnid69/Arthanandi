"use client";

import { useState, useMemo } from "react";
import { STOCKS } from "@/lib/mockData";
import Link from "next/link";

type SortKey = "symbol" | "ltp" | "change" | "pctChange" | "volume" | "high" | "low";
type SortDir = "asc" | "desc";

export default function MarketTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("pctChange");
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
    if (search) {
      const q = search.toLowerCase();
      stocks = stocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
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
  }, [search, sortKey, sortDir]);

  const COLUMNS: { key: SortKey; label: string; align?: string }[] = [
    { key: "symbol", label: "Symbol" },
    { key: "ltp", label: "LTP", align: "right" },
    { key: "change", label: "Chg", align: "right" },
    { key: "pctChange", label: "% Chg", align: "right" },
    { key: "high", label: "High", align: "right" },
    { key: "low", label: "Low", align: "right" },
    { key: "volume", label: "Volume", align: "right" },
  ];

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          Live Market Data
        </h3>
        <div className="relative w-full sm:w-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            placeholder="Filter stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-3 py-1.5 rounded-lg text-xs border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-colors"
            style={{
              background: "var(--surface-elevated)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`pb-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--text-secondary)] transition-colors ${col.align === "right" ? "text-right" : "text-left"
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
                <td className="py-2.5">
                  <Link
                    href={`/stock/${s.symbol}`}
                    className="group-hover:text-[var(--brand-light)] transition-colors"
                  >
                    <span className="font-semibold text-[var(--text-primary)]">
                      {s.symbol}
                    </span>
                    <span className="block text-[10px] text-[var(--text-muted)] line-clamp-1 max-w-[160px]">
                      {s.name}
                    </span>
                  </Link>
                </td>
                <td className="text-right font-mono font-semibold text-[var(--text-primary)]">
                  {s.ltp.toLocaleString()}
                </td>
                <td
                  className={`text-right font-mono font-semibold ${s.change >= 0 ? "text-positive" : "text-negative"
                    }`}
                >
                  {s.change >= 0 ? "+" : ""}
                  {s.change}
                </td>
                <td className="text-right">
                  <span
                    className={`badge ${s.pctChange >= 0 ? "badge-positive" : "badge-negative"
                      }`}
                  >
                    {s.pctChange >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(s.pctChange).toFixed(2)}%
                  </span>
                </td>
                <td className="text-right font-mono text-[var(--text-secondary)]">
                  {s.high.toLocaleString()}
                </td>
                <td className="text-right font-mono text-[var(--text-secondary)]">
                  {s.low.toLocaleString()}
                </td>
                <td className="text-right font-mono text-[var(--text-secondary)]">
                  {s.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[var(--text-muted)] text-sm">
          No stocks found matching &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}