"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { FaEnvelope, FaShieldAlt, FaBell, FaSignOutAlt, FaCrown } from "react-icons/fa";

export default function ProfilePage() {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        memberSince: "Jan 2024",
        tier: "Pro",
        avatar: "JD",
    };

    return (
        <div className="flex h-[calc(100vh-82px)] overflow-hidden" style={{ background: "var(--background)" }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 animate-fade-in">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                {user.avatar}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                                    {user.name}
                                </h1>
                                <p className="text-[var(--text-secondary)] flex items-center gap-2">
                                    <FaEnvelope className="w-3 h-3" /> {user.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="glass-card px-4 py-2 flex items-center gap-2 border-[var(--brand-bright)]">
                                <FaCrown className="w-4 h-4 text-[var(--brand-light)]" />
                                <span className="text-sm font-bold text-[var(--brand-light)]">{user.tier} Member</span>
                            </div>
                            <button className="btn-primary px-6 py-2 text-sm font-bold">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Account Stats & Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="card">
                                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">Account Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                                        <span className="text-xs text-[var(--text-muted)]">Username</span>
                                        <span className="text-sm font-semibold text-[var(--text-primary)]">johndoe_trader</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                                        <span className="text-xs text-[var(--text-muted)]">Member Since</span>
                                        <span className="text-sm font-semibold text-[var(--text-primary)]">{user.memberSince}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                                        <span className="text-xs text-[var(--text-muted)]">Two-Factor Auth</span>
                                        <span className="badge badge-positive text-[10px]">Enabled</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-xs text-[var(--text-muted)]">Current Device</span>
                                        <span className="text-xs text-[var(--positive)] font-mono">Windows PC (Active)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">Trading Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                                        <p className="text-[10px] text-[var(--text-muted)] mb-1">Trades Made</p>
                                        <p className="text-xl font-bold text-[var(--text-primary)]">142</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
                                        <p className="text-[10px] text-[var(--text-muted)] mb-1">Win Rate</p>
                                        <p className="text-xl font-bold text-[var(--brand-light)]">68.4%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Settings & Security */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                    <FaShieldAlt className="w-5 h-5 text-[var(--brand-light)]" />
                                    Security & Settings
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        { icon: <FaEnvelope />, title: "Email Notifications", desc: "Manage your email alerts for trade signals.", active: true },
                                        { icon: <FaBell />, title: "Push Notifications", desc: "Get real-time alerts on your mobile device.", active: false },
                                        { icon: <FaShieldAlt />, title: "Two-Factor Authentication", desc: "Secure your account with 2FA.", active: true },
                                        { icon: <FaCrown />, title: "Subscription Plan", desc: "You are currently on the Pro plan.", active: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-bright)] hover:bg-[var(--surface-hover)] transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--surface-elevated)] text-[var(--text-muted)] group-hover:text-[var(--brand-light)] transition-colors">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[var(--text-primary)]">{item.title}</p>
                                                    <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${item.active ? "bg-[var(--brand)]" : "bg-[var(--surface-elevated)]"}`}>
                                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? "left-6" : "left-1"}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card border-[var(--negative-bg)] bg-[rgba(239,68,68,0.02)]">
                                <h3 className="text-lg font-bold text-[var(--negative)] mb-4">Danger Zone</h3>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-bold text-[var(--text-primary)]">Sign Out of All Devices</p>
                                        <p className="text-xs text-[var(--text-muted)]">This will log you out from all your currently active sessions.</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--negative)] text-[var(--negative)] hover:bg-[var(--negative-bg)] transition-all text-xs font-bold">
                                        <FaSignOutAlt className="w-3 h-3" />
                                        Sign Out All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
