"use client";

import { FaCrown } from "react-icons/fa";

interface ProBadgeProps {
    className?: string;
    size?: "sm" | "md";
}

export default function ProBadge({ className = "", size = "sm" }: ProBadgeProps) {
    return (
        <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-widest rounded-full shadow-lg overflow-hidden relative group cursor-help ${size === "sm" ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-[10px]"
            } ${className}`}
            style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #db2777 100%)",
                color: "white"
            }}>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <FaCrown className={size === "sm" ? "w-2 h-2" : "w-3 h-3"} />
            PRO
        </span>
    );
}
