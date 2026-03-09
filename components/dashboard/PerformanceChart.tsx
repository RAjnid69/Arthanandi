"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { generateNepseIndexHistory } from "@/lib/mockData";

const TIMEFRAMES = [
  { label: "1D", days: 1 },
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
  { label: "ALL", days: 730 },
];

export default function PerformanceChart() {
  const [selectedTf, setSelectedTf] = useState("1M");

  const data = useMemo(() => {
    const tf = TIMEFRAMES.find((t) => t.label === selectedTf) || TIMEFRAMES[2];
    return generateNepseIndexHistory(tf.days);
  }, [selectedTf]);

  const minVal = Math.min(...data.map((d) => d.value));
  const maxVal = Math.max(...data.map((d) => d.value));
  const isPositive = data.length >= 2 && data[data.length - 1].value >= data[0].value;

  interface TooltipPayloadItem {
    value: number;
    payload: {
      date: string;
      value: number;
      turnover: number;
    };
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="glass-card px-3 py-2 text-xs">
          <p className="text-[var(--text-muted)] mb-1">{d.date}</p>
          <p className="font-bold text-[var(--text-primary)]">
            NEPSE: {d.value.toLocaleString()}
          </p>
          <p className="text-[var(--text-secondary)]">
            Turnover: Rs. {d.turnover} Cr
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            NEPSE Index Performance
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Historical chart with turnover
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border)]" style={{ background: "var(--surface-elevated)" }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.label}
              onClick={() => setSelectedTf(tf.label)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${selectedTf === tf.label
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="gradientPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minVal * 0.98, maxVal * 1.02]}
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={60}
              tickFormatter={(v: number) => v.toFixed(0)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              fill={isPositive ? "url(#gradientPositive)" : "url(#gradientNegative)"}
              dot={false}
              activeDot={{
                r: 4,
                fill: isPositive ? "#10b981" : "#ef4444",
                stroke: "var(--surface)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
