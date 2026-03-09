"use client";

import { useMemo } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine,
} from "recharts";
import {
    getStockBySymbol,
    generateHistoricalData,
    NEWS_DATA,
    AI_INSIGHTS,
} from "@/lib/mockData";
import AIPrediction from "@/components/dashboard/AIPrediction";
import TechnicalRadar from "@/components/dashboard/TechnicalRadar";
import {
    analyzeStock,
    findSupportResistance,
    generateRSISeries,
    generateMACDSeries,
    generateBollingerSeries,
} from "@/lib/technicalAnalysis";
import { FaChartLine, FaFlask, FaNewspaper } from "react-icons/fa";

const TIMEFRAMES = [
    { label: "1D", days: 1 },
    { label: "1W", days: 7 },
    { label: "1M", days: 30 },
    { label: "3M", days: 90 },
    { label: "1Y", days: 365 },
];

export default function StockDetailPage() {
    const params = useParams();
    const symbol = (params.symbol as string)?.toUpperCase();
    const stock = getStockBySymbol(symbol);
    const [selectedTf, setSelectedTf] = useState("1M");
    const [activeTab, setActiveTab] = useState<"overview" | "technical" | "news">("overview");

    const chartData = useMemo(() => {
        if (!stock) return [];
        const tf = TIMEFRAMES.find((t) => t.label === selectedTf) || TIMEFRAMES[2];
        return generateHistoricalData(stock.ltp, tf.days);
    }, [stock, selectedTf]);

    const technicalData = useMemo(() => {
        if (!stock || chartData.length === 0) return null;
        const prices = chartData.map(d => d.price);
        const volumes = chartData.map(d => d.volume);
        return {
            analysis: analyzeStock(prices, volumes),
            sr: findSupportResistance(prices),
            rsi: generateRSISeries(prices),
            macd: generateMACDSeries(prices),
            bollinger: generateBollingerSeries(prices),
        };
    }, [stock, chartData]);

    const relatedNews = NEWS_DATA.slice(0, 4);
    const aiInsight = AI_INSIGHTS.find((i) => i.symbol === symbol);

    if (!stock) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Stock Not Found
                    </h1>
                    <p className="text-[var(--text-secondary)] mb-4">
                        The symbol &quot;{symbol}&quot; was not found in our database.
                    </p>
                    <Link href="/market" className="btn-primary inline-block px-6 py-2">
                        Browse Markets
                    </Link>
                </div>
            </div>
        );
    }

    const isPositive = stock.pctChange >= 0;
    const minPrice = Math.min(...chartData.map((d) => d.price));
    const maxPrice = Math.max(...chartData.map((d) => d.price));

    interface TooltipPayloadItem {
        value: number;
        payload: { date: string; price: number; volume: number };
    }

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload;
            return (
                <div className="glass-card px-3 py-2 text-xs">
                    <p className="text-[var(--text-muted)] mb-1">{d.date}</p>
                    <p className="font-bold text-[var(--text-primary)]">Rs. {d.price.toLocaleString()}</p>
                    <p className="text-[var(--text-secondary)]">Vol: {d.volume.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    const fundamentals = [
        { label: "Open", value: stock.open.toLocaleString() },
        { label: "High", value: stock.high.toLocaleString() },
        { label: "Low", value: stock.low.toLocaleString() },
        { label: "Prev Close", value: stock.prevClose.toLocaleString() },
        { label: "Volume", value: stock.volume.toLocaleString() },
        { label: "52W High", value: stock.weekHigh52.toLocaleString() },
        { label: "52W Low", value: stock.weekLow52.toLocaleString() },
        { label: "Market Cap", value: `Rs. ${stock.marketCap} Cr` },
        { label: "EPS", value: stock.eps.toFixed(2) },
        { label: "P/E Ratio", value: stock.pe.toFixed(2) },
        { label: "Book Value", value: stock.bookValue.toFixed(2) },
        { label: "PBV", value: stock.pbv.toFixed(2) },
    ];

    return (
        <div className="min-h-screen" style={{ background: "var(--background)" }}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6">
                    <Link href="/market" className="hover:text-[var(--text-primary)] transition-colors">Markets</Link>
                    <span>/</span>
                    <span className="text-[var(--text-primary)]">{stock.symbol}</span>
                </div>

                {/* Stock Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg">
                                {stock.symbol.slice(0, 2)}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                                    {stock.symbol}
                                </h1>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    {stock.name} · {stock.sector}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                            Rs. {stock.ltp.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                            <span
                                className={`text-lg font-bold font-mono ${isPositive ? "text-positive" : "text-negative"
                                    }`}
                            >
                                {isPositive ? "+" : ""}{stock.change}
                            </span>
                            <span
                                className={`badge text-sm ${isPositive ? "badge-positive" : "badge-negative"
                                    }`}
                            >
                                {isPositive ? "▲" : "▼"} {Math.abs(stock.pctChange).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 p-1 rounded-xl border border-[var(--border)] mb-8 max-w-md" style={{ background: "var(--surface)" }}>
                    {[
                        { id: "overview" as const, label: "Overview", icon: FaChartLine },
                        { id: "technical" as const, label: "Technical Analysis", icon: FaFlask },
                        { id: "news" as const, label: "News & Sentiment", icon: FaNewspaper },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id
                                ? "bg-[var(--brand)] text-white shadow-lg"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                                }`}
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Chart + Tabs Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === "overview" && (
                            <>
                                {/* Chart */}
                                <div className="card">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-[var(--text-primary)]">
                                            Price Chart
                                        </h2>
                                        <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border)]" style={{ background: "var(--surface-elevated)" }}>
                                            {TIMEFRAMES.map((tf) => (
                                                <button
                                                    key={tf.label}
                                                    onClick={() => setSelectedTf(tf.label)}
                                                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${selectedTf === tf.label
                                                        ? "bg-[var(--brand)] text-white"
                                                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                                        }`}
                                                >
                                                    {tf.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                                                <defs>
                                                    <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                                                        <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} interval="preserveStartEnd" />
                                                <YAxis domain={[minPrice * 0.98, maxPrice * 1.02]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area type="monotone" dataKey="price" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth={2} fill="url(#stockGradient)" dot={false} activeDot={{ r: 4, fill: isPositive ? "#10b981" : "#ef4444", stroke: "var(--surface)", strokeWidth: 2 }} />

                                                {/* Support & Resistance Lines */}
                                                {technicalData?.sr.resistance.map((level, idx) => (
                                                    <ReferenceLine key={`res-${idx}`} y={level} stroke="rgba(239, 68, 68, 0.5)" strokeDasharray="3 3" label={{ position: "right", value: "Res", fill: "rgba(239, 68, 68, 0.5)", fontSize: 8 }} />
                                                ))}
                                                {technicalData?.sr.support.map((level, idx) => (
                                                    <ReferenceLine key={`sup-${idx}`} y={level} stroke="rgba(16, 185, 129, 0.5)" strokeDasharray="3 3" label={{ position: "right", value: "Sup", fill: "rgba(16, 185, 129, 0.5)", fontSize: 8 }} />
                                                ))}
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* S/R Labels */}
                                    {technicalData && (
                                        <div className="mt-4 flex flex-wrap gap-4 text-[10px]">
                                            <div className="flex gap-2">
                                                <span className="text-[var(--text-muted)]">Resistance:</span>
                                                {technicalData.sr.resistance.map((r, i) => (
                                                    <span key={i} className="text-negative font-bold">Rs. {r}</span>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-[var(--text-muted)]">Support:</span>
                                                {technicalData.sr.support.map((s, i) => (
                                                    <span key={i} className="text-positive font-bold">Rs. {s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Fundamentals */}
                                <div className="card">
                                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                                        Key Fundamentals
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {fundamentals.map((f) => (
                                            <div key={f.label} className="p-3 rounded-xl" style={{ background: "var(--surface-elevated)" }}>
                                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">{f.label}</p>
                                                <p className="text-sm font-bold font-mono text-[var(--text-primary)]">{f.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "technical" && technicalData && (
                            <div className="space-y-6">
                                {/* Indicators Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="card text-center">
                                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">RSI (14)</p>
                                        <p className={`text-2xl font-bold font-mono ${technicalData.analysis.rsi > 70 ? "text-negative" : technicalData.analysis.rsi < 30 ? "text-positive" : "text-[var(--text-primary)]"}`}>
                                            {technicalData.analysis.rsi}
                                        </p>
                                        <p className="text-[10px] text-[var(--text-muted)] mt-1">
                                            {technicalData.analysis.rsi > 70 ? "Overbought" : technicalData.analysis.rsi < 30 ? "Oversold" : "Neutral"}
                                        </p>
                                    </div>
                                    <div className="card text-center">
                                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">MACD Signal</p>
                                        <p className={`text-2xl font-bold font-mono ${technicalData.analysis.macd.histogram > 0 ? "text-positive" : "text-negative"}`}>
                                            {technicalData.analysis.macd.histogram > 0 ? "Bullish" : "Bearish"}
                                        </p>
                                        <p className="text-[10px] text-[var(--text-muted)] mt-1">Histogram: {technicalData.analysis.macd.histogram}</p>
                                    </div>
                                    <div className="card text-center">
                                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">Trend Signal</p>
                                        <p className={`text-2xl font-bold font-mono ${technicalData.analysis.overallSignal.includes("Buy") ? "text-positive" : technicalData.analysis.overallSignal.includes("Sell") ? "text-negative" : "text-[#f59e0b]"}`}>
                                            {technicalData.analysis.overallSignal}
                                        </p>
                                        <p className="text-[10px] text-[var(--text-muted)] mt-1">Technical Score: {technicalData.analysis.score}/100</p>
                                    </div>
                                </div>

                                {/* RSI Chart */}
                                <div className="card">
                                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Relative Strength Index (RSI)</h3>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={technicalData.rsi}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                                <XAxis dataKey="index" hide />
                                                <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} width={30} />
                                                <Tooltip content={({ active, payload }) => {
                                                    if (active && payload?.length) {
                                                        return <div className="glass-card px-2 py-1 text-[10px] font-bold">RSI: {payload[0].value}</div>
                                                    }
                                                    return null;
                                                }} />
                                                {/* Reference lines */}
                                                <line x1="0" y1="70" x2="100%" y2="70" stroke="rgba(239, 68, 68, 0.3)" strokeDasharray="3 3" />
                                                <line x1="0" y1="30" x2="100%" y2="30" stroke="rgba(16, 185, 129, 0.3)" strokeDasharray="3 3" />
                                                <Area type="monotone" dataKey="rsi" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.1} dot={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* MACD Chart */}
                                <div className="card">
                                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">MACD (12, 26, 9)</h3>
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={technicalData.macd}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                                <XAxis dataKey="index" hide />
                                                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} width={30} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="macd" stroke="#3b82f6" fill="transparent" dot={false} />
                                                <Area type="monotone" dataKey="signal" stroke="#f59e0b" fill="transparent" dot={false} />
                                                <Area type="monotone" dataKey="histogram" stroke="#10b981" fill="#10b981" fillOpacity={0.2} dot={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "news" && (
                            <div className="space-y-6">
                                {/* Detailed News List can go here */}
                                <div className="card">
                                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                                        Sentiment Analysis
                                    </h2>
                                    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] mb-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-full border-4 border-[var(--brand)] flex items-center justify-center">
                                                <span className="text-xl font-bold">68</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[var(--text-primary)]">Overall Bullish Sentiment</h3>
                                                <p className="text-xs text-[var(--text-muted)]">Based on recent news headlines and social trends for {symbol}.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { factor: "News Volume", score: 85, signal: "positive" },
                                                { factor: "Social Buzz", score: 42, signal: "neutral" },
                                                { factor: "Analyst Rating", score: 76, signal: "positive" },
                                            ].map(f => (
                                                <div key={f.factor} className="flex items-center gap-3">
                                                    <span className="text-[10px] text-[var(--text-secondary)] w-24">{f.factor}</span>
                                                    <div className="flex-1 h-1.5 rounded-full bg-[var(--surface)] overflow-hidden">
                                                        <div className="h-full bg-[var(--brand)]" style={{ width: `${f.score}%` }} />
                                                    </div>
                                                    <span className={`text-[10px] font-bold ${f.signal === "positive" ? "text-positive" : "text-[var(--text-muted)]"}`}>{f.score}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {NEWS_DATA.slice(0, 10).map(news => (
                                            <div key={news.id} className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)] transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-light)]">{news.time}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${news.sentiment === "bullish" ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"}`}>
                                                        {news.sentiment.toUpperCase()}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-[var(--text-primary)] mb-2">{news.title}</h4>
                                                <p className="text-xs text-[var(--text-muted)]">Nepali markets react to upcoming policy changes affecting {symbol} and the broader {stock.sector} sector...</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* AI Insight */}
                        {aiInsight && (
                            <div className="card">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: "var(--accent-glow)", color: "var(--accent-light)" }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z" /></svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-[var(--text-primary)]">AI Analysis</h3>
                                </div>
                                <div className="p-3 rounded-xl border border-[var(--border)]" style={{ background: "var(--surface-elevated)" }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${aiInsight.signal.includes("Buy")
                                            ? "bg-[rgba(16,185,129,0.15)] text-[#34d399] border-[rgba(16,185,129,0.3)]"
                                            : aiInsight.signal.includes("Sell")
                                                ? "bg-[rgba(239,68,68,0.15)] text-[#f87171] border-[rgba(239,68,68,0.3)]"
                                                : "bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border-[rgba(245,158,11,0.3)]"
                                            }`}>
                                            {aiInsight.signal}
                                        </span>
                                        <span className="text-xs font-mono text-[var(--accent-light)]">
                                            {aiInsight.confidence}% confidence
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                                        {aiInsight.reasoning}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="text-[var(--text-muted)]">Target:</span>
                                        <span className="font-mono font-bold text-[var(--text-primary)]">
                                            Rs. {aiInsight.targetPrice.toLocaleString()}
                                        </span>
                                        <span className="text-[var(--text-muted)]">|</span>
                                        <span className="text-[var(--text-muted)]">{aiInsight.timeframe}</span>
                                    </div>
                                    <div className="mt-2 h-1 rounded-full bg-[var(--surface)] overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${aiInsight.confidence}%`, background: "linear-gradient(90deg, var(--brand), var(--accent))" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Prediction Forecast */}
                        <AIPrediction symbol={symbol} currentPrice={stock.ltp} />

                        {/* Technical Radar */}
                        <TechnicalRadar symbol={symbol} currentPrice={stock.ltp} />

                        {/* Quick Stats */}
                        <div className="card">
                            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">Quick Stats</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "Day Range", value: `${stock.low.toLocaleString()} - ${stock.high.toLocaleString()}` },
                                    { label: "52W Range", value: `${stock.weekLow52.toLocaleString()} - ${stock.weekHigh52.toLocaleString()}` },
                                    { label: "Avg Volume", value: `${Math.floor(stock.volume * 0.8).toLocaleString()}` },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-1.5 text-xs border-b border-[var(--border)] last:border-0">
                                        <span className="text-[var(--text-muted)]">{item.label}</span>
                                        <span className="font-mono text-[var(--text-primary)]">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related News */}
                        <div className="card">
                            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">Related News</h3>
                            <div className="space-y-2">
                                {relatedNews.map((news) => (
                                    <div key={news.id} className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-all cursor-pointer">
                                        <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug line-clamp-2 mb-1">
                                            {news.title}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${news.sentiment === "bullish" ? "bg-[var(--positive)]"
                                                : news.sentiment === "bearish" ? "bg-[var(--negative)]"
                                                    : "bg-[var(--text-muted)]"
                                                }`} />
                                            <span className="text-[10px] text-[var(--text-muted)]">{news.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
