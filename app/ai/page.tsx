"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import SentimentGauge from "@/components/dashboard/SentimentGauge";
import PatternScanner from "@/components/dashboard/PatternScanner";
import { STOCKS, PORTFOLIO_HOLDINGS, generateHistoricalData } from "@/lib/mockData";
import { analyzeStock, optimizePortfolio, generateTradeJournal } from "@/lib/technicalAnalysis";
import { FaRobot, FaChartPie, FaHistory, FaCheckCircle, FaTimesCircle, FaClock, FaSignal, FaBrain, FaShapes, FaInfoCircle, FaHandPointer, FaCoins, FaQuestionCircle, FaPaperPlane, FaBolt, FaBell } from "react-icons/fa";
import ProBadge from "@/components/common/ProBadge";
import ProFeatureLock from "@/components/common/ProFeatureLock";

export default function AIHubPage() {
    const [activeTab, setActiveTab] = useState<"sentiment" | "optimizer" | "patterns" | "journal" | "strategy">("sentiment");
    const [claimedSignals, setClaimedSignals] = useState<number[]>([]);
    const [showAccuracyInfo, setShowAccuracyInfo] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Portfolio optimization
    const optimization = useMemo(() => {
        const totalValue = PORTFOLIO_HOLDINGS.reduce((s, h) => s + h.currentPrice * h.quantity, 0);
        const holdingsWithScore = PORTFOLIO_HOLDINGS.map(h => {
            const hist = generateHistoricalData(h.currentPrice, 200);
            const prices = hist.map(p => p.price);
            const volumes = hist.map(p => p.volume);
            const analysis = analyzeStock(prices, volumes);
            return {
                symbol: h.symbol,
                sector: h.sector,
                weight: (h.currentPrice * h.quantity / totalValue) * 100,
                score: analysis.score,
            };
        });
        return optimizePortfolio(holdingsWithScore);
    }, []);

    // Trade journal
    const journal = useMemo(() => generateTradeJournal(), []);
    const accuracy = journal.filter(j => j.outcome === "Correct").length / journal.filter(j => j.outcome !== "Pending").length * 100;

    const tabs = [
        { id: "sentiment" as const, label: "Sentiment", icon: <FaSignal className="w-4 h-4" /> },
        { id: "optimizer" as const, label: "Portfolio AI", icon: <FaBrain className="w-4 h-4" /> },
        { id: "patterns" as const, label: "Patterns", icon: <FaShapes className="w-4 h-4" /> },
        { id: "journal" as const, label: "Trade Log", icon: <FaHistory className="w-4 h-4" /> },
        { id: "strategy" as const, label: "Strategy Lab", icon: <FaBolt className="w-4 h-4" /> },
    ];

    return (
        <div className="flex h-[calc(100vh-82px)] overflow-hidden" style={{ background: "var(--background)" }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 animate-fade-in">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-xl animate-pulse-glow">
                                <FaRobot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                    AI <span className="gradient-text">Intelligence Hub</span>
                                </h1>
                                <p className="text-xs text-[var(--text-muted)]">
                                    Powered by Arthanandi Neural Engine — Analyzing {STOCKS.length} stocks in real-time
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowAccuracyInfo(!showAccuracyInfo)}
                                className="glass-card px-3 py-1.5 flex items-center gap-2 border-[var(--brand-bright)] hover:bg-[var(--brand-glow)] transition-all"
                            >
                                <div className="w-2 h-2 rounded-full bg-[var(--positive)] animate-pulse" />
                                <span className="text-[10px] font-bold text-[var(--brand-light)]">Engine Active</span>
                                <FaInfoCircle className="w-3 h-3 opacity-50" />
                            </button>
                            <div className="glass-card px-3 py-1.5 flex items-center gap-2 group relative">
                                <FaHistory className="w-3 h-3 text-[var(--text-muted)]" />
                                <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                                    {Math.round(accuracy)}% Hit Rate
                                </span>
                                {/* Tooltip Mini-Sparkline Simulation */}
                                <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    <div className="glass-card p-2 w-32 border-[var(--border-bright)]">
                                        <p className="text-[8px] text-[var(--text-muted)] mb-1">7D Rolling Accuracy</p>
                                        <div className="h-8 flex items-end gap-0.5">
                                            {[40, 60, 45, 70, 85, 75, 78].map((h, i) => (
                                                <div key={i} className="flex-1 bg-[var(--brand-light)] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showAccuracyInfo && (
                        <div className="card border-[var(--brand-bright)] bg-[var(--brand-glow)]/10 animate-slide-down">
                            <div className="flex gap-4 items-start">
                                <FaQuestionCircle className="w-5 h-5 text-[var(--brand-light)] mt-0.5 shrink-0" />
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">How Arthanandi Calculates Accuracy</h4>
                                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                        A signal is marked as <span className="text-positive font-bold">&quot;Correct&quot;</span> if the price moves &gt;1.5% in the predicted direction within 7 trading days.
                                        Our 78% win rate is benchmarked against NEPSE 2022-2026 historical volatility.
                                        <br />
                                        <span className="italic opacity-70">* Past performance is not indicative of future results. Markets are inherently stochastic.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex gap-1 p-1 rounded-xl border border-[var(--border)]" style={{ background: "var(--surface)" }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id
                                    ? "bg-[var(--brand)] text-white shadow-lg"
                                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "sentiment" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SentimentGauge />
                            <div className="card">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
                                    Sector Momentum
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { sector: "Commercial Banks", momentum: 72, signal: "bullish" },
                                        { sector: "Hydropower", momentum: 45, signal: "neutral" },
                                        { sector: "Insurance", momentum: 68, signal: "bullish" },
                                        { sector: "Development Banks", momentum: 58, signal: "neutral" },
                                        { sector: "Microfinance", momentum: 35, signal: "bearish" },
                                        { sector: "Manufacturing", momentum: 52, signal: "neutral" },
                                        { sector: "Finance", momentum: 61, signal: "bullish" },
                                        { sector: "Hotels & Tourism", momentum: 48, signal: "neutral" },
                                    ].map(s => (
                                        <div key={s.sector} className="flex items-center gap-3">
                                            <span className="text-xs text-[var(--text-secondary)] w-36 shrink-0">{s.sector}</span>
                                            <div className="flex-1 h-2 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{
                                                        width: `${s.momentum}%`,
                                                        background: s.signal === "bullish" ? "linear-gradient(90deg, #10b981, #34d399)" :
                                                            s.signal === "bearish" ? "linear-gradient(90deg, #ef4444, #f87171)" :
                                                                "linear-gradient(90deg, #f59e0b, #fbbf24)",
                                                    }}
                                                />
                                            </div>
                                            <span className={`text-[10px] font-bold font-mono w-8 text-right ${s.signal === "bullish" ? "text-positive" : s.signal === "bearish" ? "text-negative" : "text-[#f59e0b]"
                                                }`}>
                                                {s.momentum}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "optimizer" && (
                        <div className="space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="card text-center">
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Positions to Increase</p>
                                    <p className="text-3xl font-bold text-positive">{optimization.filter(o => o.action === "Increase").length}</p>
                                </div>
                                <div className="card text-center">
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Positions to Hold</p>
                                    <p className="text-3xl font-bold text-[var(--text-primary)]">{optimization.filter(o => o.action === "Hold").length}</p>
                                </div>
                                <div className="card text-center">
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Positions to Reduce</p>
                                    <p className="text-3xl font-bold text-negative">{optimization.filter(o => o.action === "Decrease").length}</p>
                                </div>
                            </div>

                            {/* Optimization Table */}
                            <div className="card overflow-x-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <FaChartPie className="w-4 h-4 text-[var(--brand-light)]" />
                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Portfolio Optimization</h3>
                                </div>
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-[var(--border)] text-[var(--text-muted)] uppercase font-bold tracking-tight">
                                            <th className="text-left pb-3">Symbol</th>
                                            <th className="text-right pb-3">Current %</th>
                                            <th className="text-right pb-3">Suggested %</th>
                                            <th className="text-center pb-3">Action</th>
                                            <th className="text-right pb-3">Risk</th>
                                            <th className="text-left pb-3 pl-4">AI Reasoning</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border)]">
                                        {optimization.map(o => (
                                            <tr key={o.symbol} className="hover:bg-[var(--surface-hover)] transition-all">
                                                <td className="py-3 font-bold text-[var(--text-primary)]">{o.symbol}</td>
                                                <td className="text-right font-mono text-[var(--text-secondary)]">{o.currentWeight}%</td>
                                                <td className="text-right font-mono font-bold text-[var(--text-primary)]">{o.suggestedWeight}%</td>
                                                <td className="text-center">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${o.action === "Increase" ? "bg-[rgba(16,185,129,0.1)] text-positive" :
                                                        o.action === "Decrease" ? "bg-[rgba(239,68,68,0.1)] text-negative" :
                                                            "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]"
                                                        }`}>
                                                        {o.action}
                                                    </span>
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <div className="w-10 h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                                                            <div className="h-full rounded-full" style={{
                                                                width: `${o.riskScore}%`,
                                                                background: o.riskScore > 60 ? "#ef4444" : o.riskScore > 40 ? "#f59e0b" : "#10b981"
                                                            }} />
                                                        </div>
                                                        <span className="font-mono text-[var(--text-muted)] w-6">{o.riskScore}</span>
                                                    </div>
                                                </td>
                                                <td className="text-left pl-4 text-[var(--text-muted)] max-w-xs truncate">{o.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "patterns" && (
                        <PatternScanner />
                    )}

                    {activeTab === "journal" && (
                        <div className="space-y-6">
                            {/* Accuracy Banner */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 card gradient-brand text-white overflow-hidden relative">
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">NEPSE Edge: {Math.round(accuracy)}%</h3>
                                            <p className="text-xs opacity-80 mb-4">Directional hit rate across {journal.length} resolved signals</p>
                                            <div className="flex gap-4">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">18.4%</p>
                                                    <p className="text-[8px] uppercase opacity-70">AI Alpha</p>
                                                </div>
                                                <div className="w-px h-8 bg-white/20" />
                                                <div className="text-center">
                                                    <p className="text-lg font-bold">9.2%</p>
                                                    <p className="text-[8px] uppercase opacity-70">NEPSE Avg</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative w-24 h-24">
                                            <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="white" strokeWidth="3" strokeDasharray={`${accuracy}, 100`} strokeLinecap="round" className="animate-gauge-draw" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xs font-bold leading-none">WIN<br />RATE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card flex flex-col justify-center gap-4 bg-[var(--surface-elevated)] border-dashed border-[var(--brand-bright)]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[var(--brand-glow)] flex items-center justify-center text-[var(--brand-light)]">
                                            <FaHandPointer className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Your Influence</p>
                                            <p className="text-sm font-bold text-[var(--text-primary)]">{claimedSignals.length} Signals Followed</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden">
                                        <div className="h-full bg-[var(--brand)] transition-all duration-1000" style={{ width: `${(claimedSignals.length / 10) * 100}%` }} />
                                    </div>
                                    <p className="text-[9px] text-[var(--text-muted)]">Follow 10 signals to unlock <span className="text-[var(--brand-light)] font-bold">Pattern Master</span> badge.</p>
                                </div>
                            </div>

                            {/* Journal Entries */}
                            <div className="card">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                                        <FaHistory className="w-4 h-4 text-[var(--brand-light)]" />
                                        Trade Signal Journal
                                    </h3>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--brand-light)] transition-all">All Signals</button>
                                        <button className="px-3 py-1 rounded-lg bg-[var(--brand-glow)] border border-[var(--brand-bright)] text-[10px] font-bold text-[var(--text-light)] relative overflow-hidden group/btn">
                                            My Follows
                                            <div className="absolute inset-0 bg-white/10 group-hover/btn:translate-x-full transition-transform duration-500 -translate-x-full" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {journal.map((entry, idx) => {
                                        const isLocked = idx > 2;
                                        const card = (
                                            <div key={entry.id} className={`p-4 rounded-2xl border transition-all group/journal relative overflow-hidden ${claimedSignals.includes(entry.id)
                                                ? "border-[var(--brand-bright)] bg-[var(--brand-glow)]/5"
                                                : "border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)]"
                                                }`}>
                                                {claimedSignals.includes(entry.id) && (
                                                    <div className="absolute top-0 right-0 py-1 px-3 bg-[var(--brand)] text-[8px] font-bold text-white uppercase rounded-bl-xl tracking-widest shadow-lg">
                                                        Claimed By You
                                                    </div>
                                                )}

                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${entry.action === "BUY" ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
                                                            }`}>
                                                            {entry.symbol.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <span className="font-bold text-[var(--text-primary)]">{entry.symbol}</span>
                                                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter ${entry.action === "BUY" ? "bg-positive text-white" : "bg-negative text-white"
                                                                    }`}>
                                                                    {entry.action}
                                                                </span>
                                                                <span className="text-[10px] font-mono text-[var(--text-muted)]">{entry.date}</span>
                                                            </div>
                                                            <p className="text-[10px] text-[var(--text-muted)]">Entry: <span className="font-mono font-bold text-[var(--text-secondary)]">Rs. {entry.price.toLocaleString()}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-tighter mb-0.5">Trust Rate</p>
                                                            <div className="flex items-center gap-2 justify-end">
                                                                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{entry.communityFollowRate}%</span>
                                                                <div className="w-12 h-1 rounded-full bg-[var(--border)] overflow-hidden">
                                                                    <div className="h-full bg-[var(--brand-light)]" style={{ width: `${entry.communityFollowRate}%` }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-px h-8 bg-[var(--border)]" />
                                                        <div className="flex flex-col items-end">
                                                            {entry.outcome !== "Pending" ? (
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-sm font-bold font-mono ${entry.returnPct! >= 0 ? "text-positive" : "text-negative"}`}>
                                                                        {entry.returnPct! >= 0 ? "+" : ""}{entry.returnPct}%
                                                                    </span>
                                                                    {entry.outcome === "Correct" ? <FaCheckCircle className="w-4 h-4 text-positive" /> : <FaTimesCircle className="w-4 h-4 text-negative" />}
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 text-[var(--warning)]">
                                                                    <span className="text-[10px] font-bold uppercase">Resolving...</span>
                                                                    <FaClock className="w-3.5 h-3.5 animate-spin-slow" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-xs text-[var(--text-secondary)] leading-loose mb-4 border-l-2 border-[var(--border)] pl-3 italic">
                                                    {entry.reasoning}
                                                </p>

                                                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                if (claimedSignals.includes(entry.id)) {
                                                                    setClaimedSignals(claimedSignals.filter(id => id !== entry.id));
                                                                } else {
                                                                    setClaimedSignals([...claimedSignals, entry.id]);
                                                                }
                                                            }}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${claimedSignals.includes(entry.id)
                                                                ? "bg-[var(--brand)] text-white shadow-lg"
                                                                : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--brand-light)] hover:border-[var(--brand-bright)]"
                                                                }`}
                                                        >
                                                            <FaHandPointer className="w-3 h-3" />
                                                            {claimedSignals.includes(entry.id) ? "Signal Followed" : "Verify & Follow"}
                                                        </button>
                                                        <button className="text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
                                                            <FaCoins className="w-3 h-3" /> Estimate P&L
                                                        </button>
                                                    </div>
                                                    <span className="text-[9px] text-[var(--text-muted)] flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-light)] animate-pulse" />
                                                        Current Accuracy: {entry.hitRate7d}%
                                                    </span>
                                                </div>
                                            </div>
                                        );

                                        return isLocked ? (
                                            <ProFeatureLock key={entry.id} featureName="Historical Signal Library" message="Free plan is limited to the 3 most recent signals. Unlock all 2,500+ past signals with Pro." height="160px">
                                                {card}
                                            </ProFeatureLock>
                                        ) : card;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "strategy" && (
                        <div className="space-y-6">
                            <div className="card border-[var(--brand-bright)] bg-gradient-to-br from-[var(--brand-glow)]/20 to-transparent">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-xl">
                                            <FaBolt className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)]">Strategy Lab</h3>
                                            <p className="text-xs text-[var(--text-muted)]">Build, Backtest, and Automate your perfect NEPSE strategy.</p>
                                        </div>
                                    </div>
                                    <ProBadge size="md" />
                                </div>

                                <ProFeatureLock
                                    featureName="Strategy Lab Access"
                                    message="Design custom AI bots that scan the market using your specific rules."
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30">
                                        <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-bright)]">
                                            <h4 className="font-bold text-[var(--text-primary)] mb-4">Market Scanner Rules</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                                                    <span className="text-xs">RSI(14) &lt; 30</span>
                                                    <div className="w-8 h-4 bg-[var(--brand)] rounded-full" />
                                                </div>
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                                                    <span className="text-xs">Sentiment &gt; 70%</span>
                                                    <div className="w-8 h-4 bg-[var(--brand)] rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-bright)]">
                                            <h4 className="font-bold text-[var(--text-primary)] mb-4">Backtest Results</h4>
                                            <div className="h-32 flex items-end justify-between gap-2">
                                                {[5, 12, 8, 15, 22, 18, 25].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-[var(--brand-light)] rounded-t-lg" style={{ height: `${h * 4}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ProFeatureLock>
                            </div>
                        </div>
                    )}
                </main>

                {/* Floating AI Assistant Trigger */}
                <div className="fixed bottom-6 right-6 z-[100] group">
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${isChatOpen ? "bg-[var(--text-primary)] rotate-90" : "gradient-brand animate-pulse-glow"
                            }`}
                    >
                        {isChatOpen ? <FaTimesCircle className="w-6 h-6" /> : <FaRobot className="w-7 h-7" />}
                    </button>

                    {/* Assistant Panel Simulation */}
                    <div className={`absolute bottom-20 right-0 w-80 glass-card border-[var(--brand-bright)] flex flex-col transition-all duration-500 origin-bottom-right ${isChatOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10 pointer-events-none"
                        }`}>
                        <div className="p-4 border-b border-[var(--border)] bg-[var(--brand-glow)]/10">
                            <h4 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <FaRobot className="text-[var(--brand-light)]" /> Ask Arthanandi
                            </h4>
                            <p className="text-[10px] text-[var(--text-muted)]">Multi-Model Engine (LSTM | XGBoost | XLM-R)</p>
                        </div>
                        <div className="h-64 p-4 overflow-y-auto space-y-4 bg-[var(--surface-elevated)]/50">
                            <div className="bg-[var(--surface-elevated)] p-3 rounded-xl border border-[var(--border)]">
                                <p className="text-xs text-[var(--text-secondary)] italic">&quot;How can I help you with your Nepalese stock strategy today? Try asking about NABIL Buy signals or the current Hydropower sentiment.&quot;</p>
                            </div>

                            {/* Pro Teaser: Priority Alerts */}
                            <div className="p-3 rounded-xl border-2 border-dashed border-[var(--brand-bright)]/30 bg-[var(--brand-glow)]/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <FaBell className="w-3 h-3 text-[var(--warning)]" />
                                        <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase">Priority Alerts</span>
                                    </div>
                                    <ProBadge />
                                </div>
                                <div className="space-y-2 opacity-50 blur-[1px]">
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                        <span className="text-[9px]">SMS Notifications</span>
                                        <div className="w-6 h-3 bg-[var(--border-bright)] rounded-full" />
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                        <span className="text-[9px]">WhatsApp Signals</span>
                                        <div className="w-6 h-3 bg-[var(--border-bright)] rounded-full" />
                                    </div>
                                </div>
                                <button className="w-full mt-3 py-1.5 rounded-lg bg-[var(--brand)] text-white text-[9px] font-bold hover:brightness-110 shadow-lg">
                                    Enable Instant Alerts
                                </button>
                            </div>
                        </div>
                        <div className="p-3 border-t border-[var(--border)] flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask about any ticker or signal..."
                                className="flex-1 bg-[var(--surface)] text-[var(--text-primary)] text-xs px-3 py-2 rounded-lg border border-[var(--border)] focus:border-[var(--brand-bright)] outline-none transition-all placeholder:opacity-50"
                            />
                            <button className="p-2 rounded-lg bg-[var(--brand)] text-white hover:brightness-110 transition-all">
                                <FaPaperPlane className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
