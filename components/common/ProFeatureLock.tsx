"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { FaLock, FaArrowRight } from "react-icons/fa";
import ProBadge from "./ProBadge";

interface ProFeatureLockProps {
    children: ReactNode;
    featureName: string;
    message?: string;
    height?: string;
}

export default function ProFeatureLock({
    children,
    featureName,
    message = "Upgrade for deep AI analytics.",
    height = "auto"
}: ProFeatureLockProps) {
    return (
        <div className="relative group/lock overflow-hidden rounded-xl" style={{ height }}>
            {/* Blurrable Content */}
            <div className="filter blur-md grayscale-[0.5] opacity-40 pointer-events-none select-none transition-all duration-500 group-hover/lock:blur-[10px] scale-[1.02]">
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-bright)] shadow-2xl flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover/lock:scale-110">
                    <FaLock className="w-5 h-5 text-[var(--warning)]" />
                </div>

                <div className="space-y-1 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <ProBadge size="md" />
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{featureName}</h4>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] max-w-[200px] leading-relaxed">
                        {message}
                    </p>
                </div>

                <Link
                    href="/pro"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-[var(--brand-light)] hover:text-white transition-all shadow-xl active:scale-95 group/btn"
                >
                    Unlock with Pro
                    <FaArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>

            {/* Decorative Sparkle for locked feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-glow)]/5 to-transparent pointer-events-none" />
        </div>
    );
}
