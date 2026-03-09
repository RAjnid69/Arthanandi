// lib/mockData.ts — Centralized mock data for Arthanandi Trading Platform

// ─── NEPSE Stock Data ────────────────────────────────────────────────
export interface Stock {
    symbol: string;
    name: string;
    sector: string;
    ltp: number;
    change: number;
    pctChange: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    prevClose: number;
    weekHigh52: number;
    weekLow52: number;
    marketCap: number; // in crores
    eps: number;
    pe: number;
    bookValue: number;
    pbv: number;
}

export const SECTORS = [
    "Commercial Banks",
    "Development Banks",
    "Hydropower",
    "Insurance",
    "Microfinance",
    "Finance",
    "Manufacturing",
    "Hotels & Tourism",
    "Trading",
    "Investment",
    "Mutual Funds",
    "Others",
] as const;

export const STOCKS: Stock[] = [
    { symbol: "NABIL", name: "Nabil Bank Limited", sector: "Commercial Banks", ltp: 1285, change: 17, pctChange: 1.34, open: 1270, high: 1295, low: 1265, volume: 45230, prevClose: 1268, weekHigh52: 1450, weekLow52: 980, marketCap: 11420, eps: 38.52, pe: 33.36, bookValue: 312, pbv: 4.12 },
    { symbol: "NICA", name: "NIC Asia Bank Limited", sector: "Commercial Banks", ltp: 862, change: -8, pctChange: -0.92, open: 870, high: 878, low: 858, volume: 67890, prevClose: 870, weekHigh52: 1020, weekLow52: 710, marketCap: 9830, eps: 28.14, pe: 30.63, bookValue: 248, pbv: 3.48 },
    { symbol: "GBIME", name: "Global IME Bank Limited", sector: "Commercial Banks", ltp: 310, change: 5, pctChange: 1.64, open: 306, high: 315, low: 304, volume: 125670, prevClose: 305, weekHigh52: 380, weekLow52: 245, marketCap: 8760, eps: 18.92, pe: 16.38, bookValue: 198, pbv: 1.57 },
    { symbol: "SCB", name: "Standard Chartered Bank", sector: "Commercial Banks", ltp: 520, change: 10, pctChange: 1.96, open: 512, high: 525, low: 510, volume: 12340, prevClose: 510, weekHigh52: 640, weekLow52: 430, marketCap: 4220, eps: 42.18, pe: 12.33, bookValue: 380, pbv: 1.37 },
    { symbol: "SBI", name: "Nepal SBI Bank Limited", sector: "Commercial Banks", ltp: 365, change: -3, pctChange: -0.82, open: 368, high: 372, low: 362, volume: 32100, prevClose: 368, weekHigh52: 440, weekLow52: 300, marketCap: 3580, eps: 22.45, pe: 16.26, bookValue: 224, pbv: 1.63 },
    { symbol: "HBL", name: "Himalayan Bank Limited", sector: "Commercial Banks", ltp: 418, change: 12, pctChange: 2.96, open: 408, high: 425, low: 406, volume: 54300, prevClose: 406, weekHigh52: 510, weekLow52: 340, marketCap: 5120, eps: 25.67, pe: 16.28, bookValue: 268, pbv: 1.56 },
    { symbol: "EBL", name: "Everest Bank Limited", sector: "Commercial Banks", ltp: 1950, change: -25, pctChange: -1.27, open: 1975, high: 1980, low: 1940, volume: 8900, prevClose: 1975, weekHigh52: 2250, weekLow52: 1650, marketCap: 6780, eps: 55.34, pe: 35.24, bookValue: 410, pbv: 4.76 },
    { symbol: "SANIMA", name: "Sanima Bank Limited", sector: "Commercial Banks", ltp: 342, change: 8, pctChange: 2.40, open: 335, high: 348, low: 334, volume: 89200, prevClose: 334, weekHigh52: 420, weekLow52: 275, marketCap: 4920, eps: 19.88, pe: 17.20, bookValue: 182, pbv: 1.88 },
    // Development Banks
    { symbol: "MNBBL", name: "Muktinath Bikas Bank", sector: "Development Banks", ltp: 435, change: 15, pctChange: 3.57, open: 422, high: 440, low: 420, volume: 34500, prevClose: 420, weekHigh52: 530, weekLow52: 350, marketCap: 2890, eps: 24.12, pe: 18.03, bookValue: 198, pbv: 2.20 },
    { symbol: "SADBL", name: "Sadhan Bikas Bank", sector: "Development Banks", ltp: 218, change: -5, pctChange: -2.24, open: 223, high: 225, low: 215, volume: 15670, prevClose: 223, weekHigh52: 310, weekLow52: 180, marketCap: 1250, eps: 12.34, pe: 17.66, bookValue: 145, pbv: 1.50 },
    { symbol: "LBBL", name: "Lumbini Bikas Bank", sector: "Development Banks", ltp: 312, change: 7, pctChange: 2.30, open: 306, high: 318, low: 305, volume: 22340, prevClose: 305, weekHigh52: 395, weekLow52: 260, marketCap: 1890, eps: 16.78, pe: 18.59, bookValue: 175, pbv: 1.78 },
    // Hydropower
    { symbol: "NHPC", name: "National Hydropower Company", sector: "Hydropower", ltp: 62, change: 3, pctChange: 5.08, open: 59, high: 64, low: 58, volume: 245000, prevClose: 59, weekHigh52: 85, weekLow52: 42, marketCap: 1560, eps: 3.45, pe: 17.97, bookValue: 42, pbv: 1.48 },
    { symbol: "BPCL", name: "Butwal Power Company", sector: "Hydropower", ltp: 345, change: -2, pctChange: -0.58, open: 347, high: 352, low: 342, volume: 18900, prevClose: 347, weekHigh52: 425, weekLow52: 290, marketCap: 3120, eps: 18.90, pe: 18.25, bookValue: 195, pbv: 1.77 },
    { symbol: "AKPL", name: "Arun Kabeli Power Limited", sector: "Hydropower", ltp: 178, change: 12, pctChange: 7.23, open: 168, high: 182, low: 166, volume: 156000, prevClose: 166, weekHigh52: 240, weekLow52: 120, marketCap: 890, eps: 8.56, pe: 20.79, bookValue: 98, pbv: 1.82 },
    { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", sector: "Hydropower", ltp: 285, change: -8, pctChange: -2.73, open: 293, high: 296, low: 280, volume: 78500, prevClose: 293, weekHigh52: 370, weekLow52: 220, marketCap: 5670, eps: 12.34, pe: 23.10, bookValue: 145, pbv: 1.97 },
    // Insurance
    { symbol: "NLIC", name: "Nepal Life Insurance Company", sector: "Insurance", ltp: 890, change: 22, pctChange: 2.53, open: 870, high: 898, low: 868, volume: 28900, prevClose: 868, weekHigh52: 1100, weekLow52: 720, marketCap: 7890, eps: 45.67, pe: 19.49, bookValue: 312, pbv: 2.85 },
    { symbol: "SICL", name: "Shikhar Insurance Company", sector: "Insurance", ltp: 545, change: -12, pctChange: -2.15, open: 557, high: 560, low: 540, volume: 14500, prevClose: 557, weekHigh52: 680, weekLow52: 440, marketCap: 2340, eps: 32.10, pe: 16.98, bookValue: 256, pbv: 2.13 },
    { symbol: "PLIC", name: "Prime Life Insurance", sector: "Insurance", ltp: 625, change: 18, pctChange: 2.96, open: 610, high: 632, low: 608, volume: 19800, prevClose: 607, weekHigh52: 780, weekLow52: 490, marketCap: 3450, eps: 35.89, pe: 17.41, bookValue: 278, pbv: 2.25 },
    // Microfinance
    { symbol: "CBBL", name: "Chhimek Bikas Bank", sector: "Microfinance", ltp: 1250, change: -35, pctChange: -2.72, open: 1285, high: 1290, low: 1240, volume: 6700, prevClose: 1285, weekHigh52: 1600, weekLow52: 980, marketCap: 1890, eps: 52.34, pe: 23.88, bookValue: 345, pbv: 3.62 },
    { symbol: "SWBBL", name: "Swabalamban Bikas Bank", sector: "Microfinance", ltp: 980, change: 25, pctChange: 2.62, open: 958, high: 992, low: 955, volume: 5400, prevClose: 955, weekHigh52: 1250, weekLow52: 780, marketCap: 1450, eps: 42.18, pe: 23.24, bookValue: 298, pbv: 3.29 },
    // Finance
    { symbol: "GUFL", name: "Gurkhas Finance Limited", sector: "Finance", ltp: 285, change: 10, pctChange: 3.64, open: 276, high: 290, low: 275, volume: 42300, prevClose: 275, weekHigh52: 360, weekLow52: 220, marketCap: 890, eps: 15.67, pe: 18.19, bookValue: 165, pbv: 1.73 },
    { symbol: "ICFC", name: "ICFC Finance Limited", sector: "Finance", ltp: 198, change: -4, pctChange: -1.98, open: 202, high: 205, low: 195, volume: 18900, prevClose: 202, weekHigh52: 270, weekLow52: 158, marketCap: 670, eps: 11.23, pe: 17.63, bookValue: 132, pbv: 1.50 },
    // Manufacturing
    { symbol: "UNL", name: "Unilever Nepal Limited", sector: "Manufacturing", ltp: 14500, change: 200, pctChange: 1.40, open: 14350, high: 14600, low: 14300, volume: 1200, prevClose: 14300, weekHigh52: 17800, weekLow52: 12000, marketCap: 2890, eps: 456.78, pe: 31.74, bookValue: 2100, pbv: 6.90 },
    { symbol: "BNT", name: "Bottlers Nepal (Terai)", sector: "Manufacturing", ltp: 3850, change: -50, pctChange: -1.28, open: 3900, high: 3920, low: 3830, volume: 3400, prevClose: 3900, weekHigh52: 4800, weekLow52: 3200, marketCap: 1560, eps: 134.56, pe: 28.61, bookValue: 890, pbv: 4.33 },
    // Hotels
    { symbol: "SHL", name: "Soaltee Hotel Limited", sector: "Hotels & Tourism", ltp: 452, change: 8, pctChange: 1.80, open: 445, high: 458, low: 443, volume: 9800, prevClose: 444, weekHigh52: 560, weekLow52: 380, marketCap: 2340, eps: 18.90, pe: 23.92, bookValue: 198, pbv: 2.28 },
    { symbol: "TRH", name: "Taragaon Regency Hotel", sector: "Hotels & Tourism", ltp: 310, change: -6, pctChange: -1.90, open: 316, high: 318, low: 308, volume: 7600, prevClose: 316, weekHigh52: 420, weekLow52: 260, marketCap: 1890, eps: 12.34, pe: 25.12, bookValue: 156, pbv: 1.99 },
];

// ─── Market Summary ──────────────────────────────────────────────────
export interface MarketSummary {
    nepseIndex: number;
    nepseChange: number;
    nepseChangePercent: number;
    totalTurnover: number; // in crores
    totalTradedShares: number;
    totalTransactions: number;
    totalScripsTraded: number;
    marketCap: number; // in arba (10 billion)
    sensIndex: number;
    sensChange: number;
    floatIndex: number;
    floatChange: number;
}

export const MARKET_SUMMARY: MarketSummary = {
    nepseIndex: 2145.67,
    nepseChange: 23.45,
    nepseChangePercent: 1.10,
    totalTurnover: 456.78,
    totalTradedShares: 8945231,
    totalTransactions: 45678,
    totalScripsTraded: 234,
    marketCap: 38.45,
    sensIndex: 412.34,
    sensChange: 5.67,
    floatIndex: 168.92,
    floatChange: 2.13,
};

// ─── Sector Performance ──────────────────────────────────────────────
export interface SectorPerformance {
    name: string;
    change: number;
    turnover: number;
    color: string;
}

export const SECTOR_DATA: SectorPerformance[] = [
    { name: "Commercial Banks", change: 1.45, turnover: 180.5, color: "#10b981" },
    { name: "Development Banks", change: 2.12, turnover: 45.2, color: "#10b981" },
    { name: "Hydropower", change: -0.87, turnover: 78.9, color: "#ef4444" },
    { name: "Insurance", change: 3.24, turnover: 32.1, color: "#10b981" },
    { name: "Microfinance", change: -1.56, turnover: 18.4, color: "#ef4444" },
    { name: "Finance", change: 0.98, turnover: 22.3, color: "#10b981" },
    { name: "Manufacturing", change: -2.34, turnover: 12.8, color: "#ef4444" },
    { name: "Hotels & Tourism", change: 1.78, turnover: 8.9, color: "#10b981" },
    { name: "Trading", change: 0.45, turnover: 5.6, color: "#10b981" },
    { name: "Investment", change: -0.23, turnover: 15.2, color: "#ef4444" },
    { name: "Mutual Funds", change: 0.67, turnover: 28.4, color: "#10b981" },
    { name: "Others", change: 1.12, turnover: 8.5, color: "#10b981" },
];

// ─── Historical Data Generator ───────────────────────────────────────
export function generateHistoricalData(
    basePrice: number,
    days: number,
    symbol?: string
): { date: string; price: number; volume: number }[] {
    const data: { date: string; price: number; volume: number }[] = [];
    let price = basePrice * 0.85;
    const today = new Date();

    // Use symbol as seed if provided
    let seed = 0.5;
    if (symbol) {
        let hash = 0;
        for (let i = 0; i < symbol.length; i++) {
            hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
        }
        seed = (Math.abs(hash) % 100) / 100;
    }

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        // Semi-deterministic volatility
        const stepSeed = (seed + (i * 0.07)) % 1;
        const volatility = (stepSeed - 0.48) * basePrice * 0.03;
        price = Math.max(price + volatility, basePrice * 0.5);
        const volume = Math.floor(stepSeed * 100000) + 5000;
        data.push({
            date: date.toISOString().split("T")[0],
            price: Math.round(price * 100) / 100,
            volume,
        });
    }
    return data;
}

export function generateNepseIndexHistory(days: number) {
    const data: { date: string; value: number; turnover: number }[] = [];
    let value = 1950;
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const volatility = (Math.random() - 0.47) * 25;
        value = Math.max(value + volatility, 1700);
        const turnover = Math.floor(Math.random() * 500) + 100;
        data.push({
            date: date.toISOString().split("T")[0],
            value: Math.round(value * 100) / 100,
            turnover,
        });
    }
    return data;
}

// ─── News Data ───────────────────────────────────────────────────────
export interface NewsItem {
    id: number;
    title: string;
    category: "Market" | "IPO" | "Company" | "Regulatory" | "Analysis";
    sentiment: "bullish" | "bearish" | "neutral";
    time: string;
    source: string;
    summary: string;
}

export const NEWS_DATA: NewsItem[] = [
    { id: 1, title: "NEPSE Index Surges Past 2100 Mark on Strong Banking Sector Rally", category: "Market", sentiment: "bullish", time: "10 min ago", source: "Arthanandi", summary: "The benchmark NEPSE index crossed the 2100-point milestone driven by heavy buying in commercial banking stocks." },
    { id: 2, title: "Nepal Rastra Bank Maintains Policy Rate Unchanged at 5.5%", category: "Regulatory", sentiment: "neutral", time: "25 min ago", source: "NRB", summary: "The central bank decided to keep the policy rate steady in its latest monetary policy review." },
    { id: 3, title: "Nabil Bank Reports 18% Growth in Q3 Net Profit", category: "Company", sentiment: "bullish", time: "1 hour ago", source: "NABIL", summary: "Nabil Bank posted impressive quarterly results with net profit reaching Rs 1.82 billion." },
    { id: 4, title: "Upper Tamakoshi Starts Commercial Generation from All Units", category: "Company", sentiment: "bullish", time: "2 hours ago", source: "UPPER", summary: "Upper Tamakoshi Hydropower has begun full commercial electricity generation." },
    { id: 5, title: "SEBON Tightens Rules on Margin Lending for Brokers", category: "Regulatory", sentiment: "bearish", time: "3 hours ago", source: "SEBON", summary: "The Securities Board of Nepal has introduced stricter guidelines for margin lending by broker dealers." },
    { id: 6, title: "Global IME Bank IPO Oversubscribed by 12x", category: "IPO", sentiment: "bullish", time: "4 hours ago", source: "GBIME", summary: "The further public offering by Global IME Bank received overwhelming response from investors." },
    { id: 7, title: "Hydropower Sector Faces Headwinds Amid Dry Season Concerns", category: "Analysis", sentiment: "bearish", time: "5 hours ago", source: "Arthanandi Research", summary: "Analysts warn that reduced water levels during dry season may impact hydropower earnings." },
    { id: 8, title: "Insurance Sector Sees 25% Growth in Premium Collection", category: "Market", sentiment: "bullish", time: "6 hours ago", source: "Industry Report", summary: "Nepal's insurance sector registered strong growth in premium collection during the first half." },
    { id: 9, title: "Nepal Telecom Plans Right Share Issue Worth Rs 5 Billion", category: "IPO", sentiment: "neutral", time: "8 hours ago", source: "NTC", summary: "State-owned Nepal Telecom is planning a significant right share offering to fund expansion." },
    { id: 10, title: "Market Analysis: Support Level at 2050 Points Holds Strong", category: "Analysis", sentiment: "bullish", time: "1 day ago", source: "Arthanandi Research", summary: "Technical analysis suggests the NEPSE index has strong support around 2050 levels." },
];

// ─── AI Sentiment Analysis ──────────────────────────────────────────
export function getSentimentAnalysis(text: string): { score: number; label: string; model: string; explanation: string } {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = (Math.abs(hash) % 200 - 100) / 100; // -1.0 to 1.0
    const label = score > 0.4 ? "Bullish" : score < -0.4 ? "Bearish" : "Neutral";

    const keywords = ["growth", "merger", "dividend", "monetary", "policy", "regulation", "earnings"];
    const found = keywords.filter(k => text.toLowerCase().includes(k)).slice(0, 2);
    const explanation = found.length > 0
        ? `Keywords detected: ${found.join(", ")}`
        : "General market sentiment trend analysis";

    return {
        score,
        label,
        model: "XLM-RoBERTa (NEPSE-tuned v2)",
        explanation
    };
}

// ─── Portfolio Data ──────────────────────────────────────────────────
export interface Holding {
    symbol: string;
    name: string;
    quantity: number;
    avgCost: number;
    currentPrice: number;
    sector: string;
}

export const PORTFOLIO_HOLDINGS: Holding[] = [
    { symbol: "NABIL", name: "Nabil Bank Limited", quantity: 100, avgCost: 1150, currentPrice: 1285, sector: "Commercial Banks" },
    { symbol: "NICA", name: "NIC Asia Bank Limited", quantity: 200, avgCost: 780, currentPrice: 862, sector: "Commercial Banks" },
    { symbol: "NHPC", name: "National Hydropower Company", quantity: 500, avgCost: 52, currentPrice: 62, sector: "Hydropower" },
    { symbol: "NLIC", name: "Nepal Life Insurance", quantity: 50, avgCost: 750, currentPrice: 890, sector: "Insurance" },
    { symbol: "GBIME", name: "Global IME Bank", quantity: 300, avgCost: 280, currentPrice: 310, sector: "Commercial Banks" },
    { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", quantity: 150, avgCost: 310, currentPrice: 285, sector: "Hydropower" },
];

// ─── AI Insights ─────────────────────────────────────────────────────
export interface AIInsight {
    id: number;
    symbol: string;
    name: string;
    signal: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";
    confidence: number;
    targetPrice: number;
    currentPrice: number;
    reasoning: string;
    timeframe: string;
}

export const AI_INSIGHTS: AIInsight[] = [
    { id: 1, symbol: "NABIL", name: "Nabil Bank Limited", signal: "Strong Buy", confidence: 92, targetPrice: 1450, currentPrice: 1285, reasoning: "LSTM Ensemble v2.4 captured long-term sequential dependencies + attention mechanism on 2024-2025 volatility spikes. Directional accuracy ~68% in backtests.", timeframe: "3-6 months" },
    { id: 2, symbol: "NHPC", name: "National Hydropower", signal: "Buy", confidence: 78, targetPrice: 82, currentPrice: 62, reasoning: "XGBoost ensemble identified top features: 30-day lagged returns, volume surge, and sector momentum. CNN 1D scan confirms technical breakout pattern.", timeframe: "6-12 months" },
    { id: 3, symbol: "GBIME", name: "Global IME Bank", signal: "Buy", confidence: 85, targetPrice: 380, currentPrice: 310, reasoning: "GRU-based sequence modeling predicts multi-period trend. Random Forest ranking puts GBIME in top 90th percentile for post-merger synergy potential.", timeframe: "3-6 months" },
    { id: 4, symbol: "EBL", name: "Everest Bank Limited", signal: "Hold", confidence: 65, targetPrice: 2000, currentPrice: 1950, reasoning: "Transformer-based (XLM-R) encoder shows neutral correlation with recent macro shift. LSTM indicates mean reversion target at Rs. 1980.", timeframe: "6 months" },
    { id: 5, symbol: "UPPER", name: "Upper Tamakoshi", signal: "Sell", confidence: 72, targetPrice: 240, currentPrice: 285, reasoning: "CNN Pattern Recognition detected valid 'Double Top' on weekly chart. Anomaly autoencoder flagged unusual divergence in price-volume ratio.", timeframe: "3 months" },
    { id: 6, symbol: "HBL", name: "Himalayan Bank", signal: "Strong Buy", confidence: 88, targetPrice: 510, currentPrice: 418, reasoning: "LSTM-Attention Hybrid model suggests 92% confidence in short-term support levels. XLM-R sentiment analysis of remittance news: Highly Bullish.", timeframe: "3-6 months" },
    { id: 7, symbol: "AKPL", name: "Arun Kabeli Power", signal: "Sell", confidence: 81, targetPrice: 160, currentPrice: 178, reasoning: "CNN-Powered Pattern Engine identifies overextended RSI(14) divergence. XGBoost feature weights: Peak volume exhaustion detected.", timeframe: "1 month" },
    { id: 8, symbol: "CBBL", name: "Chhimek Bikas Bank", signal: "Buy", confidence: 76, targetPrice: 1350, currentPrice: 1250, reasoning: "GNN-based sector relationship analysis predicts spillover from commercial banking rally. LSTM confirms reversal pattern.", timeframe: "3 months" },
];

// ─── Market Ticker Data ──────────────────────────────────────────────
export interface TickerItem {
    symbol: string;
    price: number;
    change: number;
}

export const TICKER_DATA: TickerItem[] = [
    { symbol: "NEPSE", price: 2145.67, change: 1.10 },
    { symbol: "NABIL", price: 1285, change: 1.34 },
    { symbol: "NICA", price: 862, change: -0.92 },
    { symbol: "GBIME", price: 310, change: 1.64 },
    { symbol: "NHPC", price: 62, change: 5.08 },
    { symbol: "NLIC", price: 890, change: 2.53 },
    { symbol: "UPPER", price: 285, change: -2.73 },
    { symbol: "HBL", price: 418, change: 2.96 },
    { symbol: "EBL", price: 1950, change: -1.27 },
    { symbol: "SANIMA", price: 342, change: 2.40 },
    { symbol: "AKPL", price: 178, change: 7.23 },
    { symbol: "UNL", price: 14500, change: 1.40 },
];

// ─── AI Metrics Helpers ──────────────────────────────────────────────
export function getAIScore(symbol: string): number {
    // Deterministic score based on symbol characters
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
        hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Result between 75 and 98
    return 75 + (Math.abs(hash) % 24);
}

export function generateAIPrediction(currentPrice: number, symbol?: string) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date().getDay();
    let lastPrice = currentPrice;

    // Use symbol as seed if provided for deterministic mock data
    let seed = 0.5;
    if (symbol) {
        let hash = 0;
        for (let i = 0; i < symbol.length; i++) {
            hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
        }
        seed = (Math.abs(hash) % 100) / 100;
    }

    const predictions = Array.from({ length: 7 }).map((_, i) => {
        const dayName = days[(today + i) % 7];
        // Semi-deterministic movement based on seed and step i
        const stepSeed = (seed + (i * 0.13)) % 1;
        const changePercent = (stepSeed - 0.4) * 0.02;
        lastPrice *= (1 + changePercent);
        return {
            day: dayName,
            price: Math.round(lastPrice),
        };
    });

    return {
        data: predictions,
        model: seed > 0.7 ? "LSTM-Attention Hybrid" : seed > 0.4 ? "LSTM Ensemble v2.4" : "GRU Sequence v1.8",
        confidence: 68 + (Math.floor(seed * 17)) // Range 68% to 85%
    };
}

export function getTopGainers(count = 5) {
    return [...STOCKS]
        .filter((s) => s.pctChange > 0)
        .sort((a, b) => b.pctChange - a.pctChange)
        .slice(0, count);
}

export function getTopLosers(count = 5) {
    return [...STOCKS]
        .filter((s) => s.pctChange < 0)
        .sort((a, b) => a.pctChange - b.pctChange)
        .slice(0, count);
}

export function getMostActive(count = 5) {
    return [...STOCKS]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, count);
}

export function getStockBySymbol(symbol: string) {
    return STOCKS.find((s) => s.symbol === symbol);
}

export function getStocksBySector(sector: string) {
    return STOCKS.filter((s) => s.sector === sector);
}
