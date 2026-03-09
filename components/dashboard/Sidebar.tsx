"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaChartLine,
  FaNewspaper,
  FaArrowUp,
  FaList,
  FaStar,
  FaBriefcase,
  FaRobot,
  FaFilter,
  FaTh,
  FaCog,
  FaCrown,
} from "react-icons/fa";

const NAV_SECTIONS = [
  {
    label: "Market",
    items: [
      { name: "Overview", icon: FaChartLine, href: "/dashboard" },
      { name: "Market News", icon: FaNewspaper, href: "/dashboard#news" },
      { name: "Top Movers", icon: FaArrowUp, href: "/dashboard#movers" },
      { name: "All Stocks", icon: FaList, href: "/market" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { name: "Watchlist", icon: FaStar, href: "/dashboard#watchlist" },
      { name: "My Portfolio", icon: FaBriefcase, href: "/dashboard#portfolio" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "AI Hub", icon: FaRobot, href: "/ai" },
      { name: "Screener", icon: FaFilter, href: "/screener" },
      { name: "Sectors", icon: FaTh, href: "/dashboard#sectors" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // Initial hash
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-[var(--border)] transition-all duration-300 ${collapsed ? "w-[68px]" : "w-60"
        }`}
      style={{ background: "var(--surface)" }}
    >
      {/* Collapse Toggle */}
      <div className="p-3 flex items-center justify-between border-b border-[var(--border)]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-bold gradient-text whitespace-nowrap">
              Arthanandi
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
          aria-label="Toggle sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {collapsed ? (
              <path d="M5 12h14M12 5l7 7-7 7" />
            ) : (
              <path d="M19 12H5M12 19l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const itemPath = item.href.split('#')[0];
                const itemHash = item.href.includes('#') ? '#' + item.href.split('#')[1] : '';
                const isActive = pathname === itemPath && currentHash === itemHash;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`w-full flex items-center gap-3 rounded-lg transition-all duration-200 ${collapsed ? "px-2 py-2.5 justify-center" : "px-3 py-2"
                      } ${isActive
                        ? "bg-[var(--brand-glow)] text-[var(--brand-light)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[var(--brand-light)]" : ""}`} />
                    {!collapsed && (
                      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                    )}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Pro Promo Card */}
        {!collapsed && (
          <div className="mx-3 mt-4 p-4 rounded-xl border border-[var(--brand-bright)] bg-gradient-to-br from-[var(--brand-glow)] to-transparent relative overflow-hidden group/pro">
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-[var(--warning)] opacity-10 rounded-full blur-xl group-hover/pro:opacity-20 transition-opacity" />
            <div className="flex items-center gap-2 mb-2">
              <FaCrown className="w-3 h-3 text-[var(--warning)]" />
              <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-wider">Investor PRO</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] leading-tight mb-3">
              Unlock the Neural Engine's full potential.
            </p>
            <Link
              href="/pro"
              className="block w-full py-2 rounded-lg bg-[var(--brand)] text-white text-[10px] font-bold text-center hover:brightness-110 active:scale-95 transition-all"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-[var(--border)]">
        <Link
          href="/profile"
          className={`w-full flex items-center gap-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all ${collapsed ? "px-2 py-2.5 justify-center" : "px-3 py-2"
            }`}
        >
          <FaCog className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>
    </aside>
  );
}