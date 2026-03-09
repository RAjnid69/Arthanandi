"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TICKER_DATA } from "@/lib/mockData";
import { useAuth } from "@/lib/auth";
import { FaUser, FaSignOutAlt, FaChevronDown, FaCrown } from "react-icons/fa";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Markets", href: "/market" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Hub", href: "/ai" },
    { name: "Screener", href: "/screener" },
    { name: "Pricing", href: "/" },
  ];

  return (
    <>
      {/* Live Market Ticker Strip */}
      <div className="ticker-strip bg-[#060a14] border-b border-[var(--border)] py-1.5 text-xs">
        <div className="ticker-content">
          {[...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
            <span key={idx} className="inline-flex items-center mx-4 gap-1.5">
              <span className="font-semibold text-[var(--text-secondary)]">
                {item.symbol}
              </span>
              <span className="text-[var(--text-primary)] font-mono">
                {item.price.toLocaleString()}
              </span>
              <span
                className={`font-mono font-semibold ${item.change >= 0 ? "text-positive" : "text-negative"
                  }`}
              >
                {item.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(item.change).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-shadow group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Image
                  src="/logo.svg"
                  alt="Arthanandi Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">
                Arthanandi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/pro"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--brand-glow)] border border-[var(--brand-bright)] text-[10px] font-bold text-[var(--brand-light)] hover:bg-[var(--brand)] hover:text-white transition-all shadow-sm"
              >
                <FaCrown className="w-3 h-3 text-[var(--warning)]" />
                GO PRO
              </Link>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border)] hover:border-[var(--brand-bright)] bg-[var(--surface-elevated)] transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {user.avatar}
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-primary)]">{user.name}</span>
                    <FaChevronDown className={`w-2.5 h-2.5 text-[var(--text-muted)] transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card border-[var(--border-bright)] shadow-2xl overflow-hidden animate-slide-down">
                      <div className="p-3 border-b border-[var(--border)]">
                        <p className="text-xs font-bold text-[var(--text-primary)]">{user.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser className="w-3 h-3 text-[var(--brand-light)]" /> Profile Settings
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-3 h-3 text-[var(--brand-light)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                          My Dashboard
                        </Link>
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-negative hover:bg-[var(--negative-bg)] transition-all text-left mt-1"
                        >
                          <FaSignOutAlt className="w-3 h-3" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary text-sm px-4 py-2">
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary text-sm px-5 py-2 inline-flex items-center gap-1.5"
                  >
                    Get Started
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none p-2 -mr-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-[var(--border)] mt-2">
                {user ? (
                  <>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[var(--text-primary)] font-semibold hover:bg-[var(--surface-hover)]" onClick={() => setIsMobileOpen(false)}>
                      <FaUser className="w-4 h-4 text-[var(--brand-light)]" /> Profile Settings
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMobileOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-negative font-semibold hover:bg-[var(--negative-bg)]"
                    >
                      <FaSignOutAlt className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-secondary text-sm px-4 py-2.5 text-center" onClick={() => setIsMobileOpen(false)}>
                      Log In
                    </Link>
                    <Link href="/signup" className="btn-primary text-sm px-4 py-2.5 text-center" onClick={() => setIsMobileOpen(false)}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
