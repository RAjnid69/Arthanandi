"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
    >
      {dark ? <FaSun className="w-3 h-3 text-warning" /> : <FaMoon className="w-3 h-3 text-blue-400" />}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
