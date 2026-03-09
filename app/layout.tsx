import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Arthanandi — Smart Trading Intelligence",
  description:
    "Arthanandi is Nepal's most advanced stock market intelligence platform. Real-time NEPSE data, AI-powered insights, portfolio tracking, stock screening, and comprehensive market analysis.",
  keywords:
    "NEPSE, stock market, Nepal, trading, AI insights, portfolio, stock screener, Arthanandi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
