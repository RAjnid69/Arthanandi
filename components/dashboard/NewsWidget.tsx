"use client";

import { useState } from "react";
import { NEWS_DATA, type NewsItem } from "@/lib/mockData";

const CATEGORIES = ["All", "Market", "IPO", "Company", "Regulatory", "Analysis"] as const;

function SentimentBadge({ sentiment }: { sentiment: NewsItem["sentiment"] }) {
  const styles = {
    bullish: "badge-positive",
    bearish: "badge-negative",
    neutral: "badge-neutral",
  };
  const labels = {
    bullish: "▲ Bullish",
    bearish: "▼ Bearish",
    neutral: "● Neutral",
  };
  return <span className={`badge text-[10px] ${styles[sentiment]}`}>{labels[sentiment]}</span>;
}

export default function NewsWidget() {
  const [category, setCategory] = useState<string>("All");

  const filtered =
    category === "All"
      ? NEWS_DATA
      : NEWS_DATA.filter((n) => n.category === category);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          Market News
        </h3>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${category === cat
                ? "bg-[var(--brand)] text-white"
                : "border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-bright)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {filtered.map((news) => (
          <div
            key={news.id}
            className="p-3 rounded-xl border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand-light)] transition-colors line-clamp-2">
                {news.title}
              </h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">
              {news.summary}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border)] rounded px-1.5 py-0.5">
                {news.category}
              </span>
              <SentimentBadge sentiment={news.sentiment} />
              <span className="text-[10px] text-[var(--text-muted)] ml-auto">
                {news.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}