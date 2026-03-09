"use client";

import { useState } from "react";
import { FaChevronRight, FaCheckCircle, FaShieldAlt, FaRocket, FaBalanceScale } from "react-icons/fa";

interface QuizStep {
    question: string;
    options: { label: string; value: string; icon?: any }[];
}

export default function RiskQuiz({ onComplete }: { onComplete: (profile: any) => void }) {
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
        ageRange: "",
        capital: "",
        riskAppetite: ""
    });

    const steps: QuizStep[] = [
        {
            question: "What is your primary investment goal?",
            options: [
                { label: "Capital Preservation", value: "conservative", icon: FaShieldAlt },
                { label: "Balanced Growth", value: "moderate", icon: FaBalanceScale },
                { label: "Aggressive Returns", value: "aggressive", icon: FaRocket }
            ]
        },
        {
            question: "What is your usual investment timeframe?",
            options: [
                { label: "Short Term (Weeks/Months)", value: "short" },
                { label: "Long Term (Years)", value: "long" },
                { label: "Day Trading", value: "trading" }
            ]
        },
        {
            question: "How do you react to a 10% market dip?",
            options: [
                { label: "Sell everything (Safety first)", value: "safe" },
                { label: "Hold and wait", value: "hold" },
                { label: "Buy more at discount", value: "contrarian" }
            ]
        }
    ];

    const handleOptionSelect = (value: string) => {
        const keys = ["riskAppetite", "timeframe", "reactivity"];
        const newProfile = { ...profile, [keys[step]]: value };
        setProfile(newProfile);

        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete(newProfile);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm animate-fade-in">
            <div className="card max-w-lg w-full p-8 border-[var(--brand-bright)] bg-[var(--surface)] shadow-2xl relative overflow-hidden">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-1 bg-[var(--brand)] transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />

                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white mx-auto mb-4 scale-110 shadow-lg">
                        <FaCheckCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Personalize your <span className="gradient-text">AI Copilot</span></h2>
                    <p className="text-sm text-[var(--text-muted)] mt-2">Help Arthanandi tailor insights to your financial goals.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-bold text-[var(--brand-light)] uppercase tracking-widest mb-1">Step {step + 1} of {steps.length}</p>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{steps[step].question}</h3>
                    </div>

                    <div className="space-y-3">
                        {steps[step].options.map((opt) => {
                            const Icon = opt.icon;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => handleOptionSelect(opt.value)}
                                    className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--brand)] hover:bg-[var(--brand-glow)] transition-all group group-hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        {Icon && (
                                            <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--brand-light)] transition-colors">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                        )}
                                        <span className="font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{opt.label}</span>
                                    </div>
                                    <FaChevronRight className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--brand-light)] translate-x-0 group-hover:translate-x-1 transition-all" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p className="text-[10px] text-center text-[var(--text-muted)] mt-8">
                    We use this data only to curate your AI Feed. This information remains private.
                </p>
            </div>
        </div>
    );
}
