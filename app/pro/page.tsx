"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import ProBadge from "@/components/common/ProBadge";
import { FaCrown, FaCheck, FaBolt, FaSignal, FaBell, FaGlobeAmericas, FaShieldAlt, FaBrain, FaHistory } from "react-icons/fa";

const FEATURES = [
    {
        title: "Deep AI Intelligence",
        desc: "Unlock XGBoost Factor Analysis and see the 'Why' behind every signal.",
        icon: <FaBrain className="text-pink-500" />
    },
    {
        title: "Priority Alerts",
        desc: "Instant SMS & WhatsApp delivery for time-sensitive breakout signals.",
        icon: <FaBell className="text-orange-500" />
    },
    {
        title: "Strategy Lab",
        desc: "Build, backtest and automate your own custom AI trading bots.",
        icon: <FaBolt className="text-yellow-400" />
    },
    {
        title: "5-Year History",
        desc: "Clean, searchable access to every signal generated since 2021.",
        icon: <FaHistory className="text-blue-500" />
    }
];


export default function ProLandingPage() {
    return (
        <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-10">
                    <div className="max-w-5xl mx-auto space-y-16">

                        {/* Hero Section */}
                        <div className="text-center space-y-6 pt-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-glow)] border border-[var(--brand-bright)] mb-4">
                                <FaCrown className="text-[var(--warning)] animate-bounce" />
                                <span className="text-xs font-bold text-[var(--brand-light)] uppercase tracking-widest">Premium Intelligence</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
                                Trade with the <br />
                                <span className="gradient-text">Arthanandi Edge</span>
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                                Join Kathmandu&apos;s elite traders. Get institutional-grade AI analytics, instant alerts, and advanced risk management tools.
                            </p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Free Tier */}
                            <div className="card border-[var(--border)] opacity-80 scale-95 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">Investor Basic</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-6">Casual market monitoring.</p>
                                <p className="text-4xl font-black mb-8">Rs. 0 <span className="text-sm text-[var(--text-muted)] font-normal">/month</span></p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {["Basic AI Sentiment", "Limited Pattern Scanner", "7-Day Signal History", "Web-only alerts"].map(f => (
                                        <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                            <FaCheck className="text-[var(--text-muted)] w-3 h-3" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-3 rounded-xl border border-[var(--border-bright)] text-sm font-bold text-[var(--text-muted)] cursor-not-allowed">
                                    Current Plan
                                </button>
                            </div>

                            {/* Pro Tier */}
                            <div className="card border-[var(--brand-bright)] relative flex flex-col group overflow-hidden shadow-2xl shadow-[var(--brand-glow)]/20">
                                <div className="absolute top-0 right-0 py-2 px-6 bg-[var(--brand)] text-xs font-bold text-white uppercase tracking-widest rounded-bl-2xl">
                                    Recommended
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-2xl font-black text-[var(--text-primary)]">Investor PRO</h3>
                                    <ProBadge size="md" />
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mb-6">For the serious NEPSE professional.</p>
                                <p className="text-4xl font-black mb-8 text-[var(--brand-light)]">Rs. 999 <span className="text-sm text-[var(--text-muted)] font-normal">/month</span></p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {[
                                        "XGBoost Factor Analysis",
                                        "Unlimited Signal History",
                                        "Instant SMS/WhatsApp Alerts",
                                        "Strategy Lab & Backtesting",
                                        "30-Day Volatility Forecasts",
                                        "Priority AI Support"
                                    ].map(f => (
                                        <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-primary)] font-medium">
                                            <div className="w-5 h-5 rounded-full bg-[var(--brand-glow)] flex items-center justify-center">
                                                <FaCheck className="text-[var(--brand-light)] w-2.5 h-2.5" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-4 rounded-xl gradient-brand text-white font-bold text-sm shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all active:scale-95 group/btn overflow-hidden relative">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Upgrade Now <FaBolt className="w-3 h-3 group-hover/btn:animate-pulse" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                </button>
                            </div>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10">
                            {FEATURES.map(f => (
                                <div key={f.title} className="space-y-3 p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[var(--border)] hover:border-[var(--border-bright)] transition-all">
                                    <div className="text-2xl mb-4">{f.icon}</div>
                                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{f.title}</h4>
                                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trust Footer */}
                        <div className="text-center border-t border-[var(--border)] pt-10 pb-20 opacity-60">
                            <div className="flex items-center justify-center gap-8 mb-6 grayscale brightness-200">
                                <FaShieldAlt className="w-8 h-8 opacity-50" />
                                <FaGlobeAmericas className="w-8 h-8 opacity-50" />
                                <FaSignal className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Secure Payments via eSewa & Khalti • Official Arthanandi Partner</p>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
