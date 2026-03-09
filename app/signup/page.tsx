"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaApple, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email);
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--background)" }}>
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px] animate-pulse-glow" style={{ background: "var(--accent)" }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px] animate-pulse-glow" style={{ background: "var(--brand)" }} />

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 group">
                    <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="glass-panel p-8 md:p-10 border border-[var(--border-bright)] shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                            Join <span className="gradient-text">Arthanandi</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Start your intelligent trading journey today
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 ml-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-all"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 ml-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-all"
                                    style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-all"
                                style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--brand)] focus:outline-none transition-all"
                                style={{ background: "var(--surface-elevated)", color: "var(--text-primary)" }}
                            />
                        </div>

                        <div className="flex items-center gap-2 py-2">
                            <input type="checkbox" required id="terms" className="rounded border-[var(--border)] bg-[var(--surface-elevated)]" />
                            <label htmlFor="terms" className="text-[10px] text-[var(--text-muted)]">
                                I agree to the <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button type="submit" className="btn-primary w-full py-4 mt-2 font-bold tracking-wide">
                            Create Account
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--border)]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 text-[var(--text-muted)] border-[var(--border)]" style={{ background: "transparent" }}>
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => { login("google_user@gmail.com"); router.push("/dashboard"); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all text-sm font-semibold text-[var(--text-primary)]">
                            <FaGoogle className="w-4 h-4 text-[#EA4335]" />
                            Google
                        </button>
                        <button type="button" onClick={() => { login("apple_user@icloud.com"); router.push("/dashboard"); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all text-sm font-semibold text-[var(--text-primary)]">
                            <FaApple className="w-4 h-4" />
                            Apple
                        </button>
                    </div>

                    <p className="text-center mt-10 text-sm text-[var(--text-muted)]">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold text-[var(--brand-light)] hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
