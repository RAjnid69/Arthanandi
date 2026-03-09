"use client";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { MARKET_SUMMARY } from "@/lib/mockData";

export default function Topbar() {
  return (
    <div
      className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]"
      style={{ background: "var(--surface)" }}
    >
      {/* Left: Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs" />
          <input
            type="text"
            placeholder="Search stocks, news, sectors..."
            className="w-full pl-9 pr-12 py-2 rounded-lg text-sm border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-colors"
            style={{
              background: "var(--surface-elevated)",
              color: "var(--text-primary)",
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-muted)] font-mono border border-[var(--border)] rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>

      {/* Center: Market Summary */}
      <div className="hidden lg:flex items-center gap-6 mx-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">NEPSE</span>
          <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
            {MARKET_SUMMARY.nepseIndex.toLocaleString()}
          </span>
          <span
            className={`badge text-xs ${MARKET_SUMMARY.nepseChangePercent >= 0
                ? "badge-positive"
                : "badge-negative"
              }`}
          >
            {MARKET_SUMMARY.nepseChangePercent >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(MARKET_SUMMARY.nepseChangePercent).toFixed(2)}%
          </span>
        </div>
        <div className="w-px h-5 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">Turnover</span>
          <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
            {MARKET_SUMMARY.totalTurnover} Cr
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all">
          <FaBell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--brand)] ring-2 ring-[var(--surface)]" />
        </button>
        <div className="w-px h-5 bg-[var(--border)]" />
        <button className="flex items-center gap-2 hover:bg-[var(--surface-hover)] rounded-lg px-2 py-1.5 transition-all">
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center">
            <FaUserCircle className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              Investor
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">Pro Plan</p>
          </div>
        </button>
      </div>
    </div>
  );
}