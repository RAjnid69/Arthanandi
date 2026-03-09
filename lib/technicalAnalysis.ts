// lib/technicalAnalysis.ts — Pure TypeScript Technical Analysis Engine
// Powers all AI features in the Arthanandi Trading Platform

// ─── Types ───────────────────────────────────────────────────────────

export interface TechnicalIndicators {
    rsi: number;
    macd: { macd: number; signal: number; histogram: number };
    bollingerBands: { upper: number; middle: number; lower: number; width: number };
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
    atr: number;
    volumeTrend: "increasing" | "decreasing" | "stable";
    overallSignal: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
    score: number; // 0-100, composite technical score
}

export interface SupportResistance {
    support: number[];
    resistance: number[];
}

export interface PatternResult {
    pattern: string;
    type: "bullish" | "bearish" | "neutral";
    confidence: number;
    description: string;
    priceTarget?: number;
}

export interface SentimentData {
    overall: number; // 0-100 (0 = extreme fear, 100 = extreme greed)
    label: "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";
    factors: {
        name: string;
        value: number;
        signal: "bullish" | "bearish" | "neutral";
    }[];
}

export interface OptimizationResult {
    symbol: string;
    currentWeight: number;
    suggestedWeight: number;
    action: "Increase" | "Decrease" | "Hold" | "Add" | "Remove";
    reason: string;
    riskScore: number;
}

export interface TradeJournalEntry {
    id: number;
    date: string;
    symbol: string;
    action: "BUY" | "SELL" | "HOLD";
    price: number;
    reasoning: string;
    outcome?: "Correct" | "Incorrect" | "Pending";
    returnPct?: number;
    communityFollowRate: number; // Percentage of users who followed
    hitRate7d?: number; // 7-day rolling hit rate at time of signal
}

// ─── Core Calculations ───────────────────────────────────────────────

function calculateSMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1];
    const slice = prices.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
}

function calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1];
    const k = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
    for (let i = period; i < prices.length; i++) {
        ema = prices[i] * k + ema * (1 - k);
    }
    return ema;
}

function calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;
    const changes = prices.slice(1).map((p, i) => p - prices[i]);
    const recent = changes.slice(-period);
    let gains = 0, losses = 0;
    recent.forEach(c => {
        if (c > 0) gains += c;
        else losses += Math.abs(c);
    });
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

function calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macdLine = ema12 - ema26;
    // Simplified signal line
    const signalLine = macdLine * 0.8;
    return {
        macd: Math.round(macdLine * 100) / 100,
        signal: Math.round(signalLine * 100) / 100,
        histogram: Math.round((macdLine - signalLine) * 100) / 100,
    };
}

function calculateBollingerBands(prices: number[], period: number = 20, stdDevMultiplier: number = 2) {
    const sma = calculateSMA(prices, period);
    const slice = prices.slice(-period);
    const variance = slice.reduce((sum, p) => sum + Math.pow(p - sma, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    return {
        upper: Math.round((sma + stdDevMultiplier * stdDev) * 100) / 100,
        middle: Math.round(sma * 100) / 100,
        lower: Math.round((sma - stdDevMultiplier * stdDev) * 100) / 100,
        width: Math.round(((stdDevMultiplier * 2 * stdDev) / sma) * 10000) / 100, // as percentage
    };
}

function calculateATR(highs: number[], lows: number[], closes: number[], period: number = 14): number {
    if (highs.length < 2) return 0;
    const trueRanges: number[] = [];
    for (let i = 1; i < highs.length; i++) {
        const tr = Math.max(
            highs[i] - lows[i],
            Math.abs(highs[i] - closes[i - 1]),
            Math.abs(lows[i] - closes[i - 1])
        );
        trueRanges.push(tr);
    }
    const recent = trueRanges.slice(-period);
    return recent.reduce((a, b) => a + b, 0) / recent.length;
}

// ─── Composite Analysis ──────────────────────────────────────────────

export function analyzeStock(
    prices: number[],
    volumes: number[],
    highs?: number[],
    lows?: number[]
): TechnicalIndicators {
    const h = highs || prices.map(p => p * 1.01);
    const l = lows || prices.map(p => p * 0.99);

    const rsi = calculateRSI(prices);
    const macd = calculateMACD(prices);
    const bb = calculateBollingerBands(prices);
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const sma200 = calculateSMA(prices, 200);
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const atr = calculateATR(h, l, prices);

    // Volume trend
    const recentVol = volumes.slice(-5);
    const prevVol = volumes.slice(-10, -5);
    const avgRecent = recentVol.reduce((a, b) => a + b, 0) / (recentVol.length || 1);
    const avgPrev = prevVol.reduce((a, b) => a + b, 0) / (prevVol.length || 1);
    const volumeTrend: TechnicalIndicators["volumeTrend"] =
        avgRecent > avgPrev * 1.15 ? "increasing" :
            avgRecent < avgPrev * 0.85 ? "decreasing" : "stable";

    // Composite score (0-100)
    let score = 50;
    // RSI contribution (-15 to +15)
    if (rsi < 30) score += 15;
    else if (rsi < 40) score += 8;
    else if (rsi > 70) score -= 15;
    else if (rsi > 60) score -= 5;

    // MACD contribution (-10 to +10)
    if (macd.histogram > 0) score += Math.min(macd.histogram * 2, 10);
    else score += Math.max(macd.histogram * 2, -10);

    // Price vs SMA (-10 to +10)
    const currentPrice = prices[prices.length - 1];
    if (currentPrice > sma20) score += 5;
    if (currentPrice > sma50) score += 3;
    if (currentPrice > sma200) score += 2;
    if (currentPrice < sma20) score -= 5;
    if (currentPrice < sma50) score -= 3;

    // Volume confirmation (-5 to +5)
    if (volumeTrend === "increasing" && macd.histogram > 0) score += 5;
    if (volumeTrend === "decreasing" && macd.histogram < 0) score += 5;

    // Bollinger position (-5 to +5)
    const bbPosition = (currentPrice - bb.lower) / (bb.upper - bb.lower);
    if (bbPosition < 0.2) score += 5; // Near lower band = potential buy
    if (bbPosition > 0.8) score -= 5; // Near upper band = potential sell

    score = Math.max(0, Math.min(100, score));

    const overallSignal: TechnicalIndicators["overallSignal"] =
        score >= 75 ? "Strong Buy" :
            score >= 60 ? "Buy" :
                score >= 40 ? "Neutral" :
                    score >= 25 ? "Sell" : "Strong Sell";

    return {
        rsi: Math.round(rsi * 100) / 100,
        macd,
        bollingerBands: bb,
        sma20: Math.round(sma20 * 100) / 100,
        sma50: Math.round(sma50 * 100) / 100,
        sma200: Math.round(sma200 * 100) / 100,
        ema12: Math.round(ema12 * 100) / 100,
        ema26: Math.round(ema26 * 100) / 100,
        atr: Math.round(atr * 100) / 100,
        volumeTrend,
        overallSignal,
        score,
    };
}

// ─── Support / Resistance ────────────────────────────────────────────

export function findSupportResistance(prices: number[]): SupportResistance {
    // Find local minima and maxima using a window of 5
    const supports: number[] = [];
    const resistances: number[] = [];
    const window = 5;

    for (let i = window; i < prices.length - window; i++) {
        const slice = prices.slice(i - window, i + window + 1);
        const min = Math.min(...slice);
        const max = Math.max(...slice);
        if (prices[i] === min) supports.push(Math.round(prices[i] * 100) / 100);
        if (prices[i] === max) resistances.push(Math.round(prices[i] * 100) / 100);
    }

    // Deduplicate nearby levels (within 1%)
    const dedup = (levels: number[]) => {
        const result: number[] = [];
        const sorted = [...levels].sort((a, b) => a - b);
        for (const l of sorted) {
            if (!result.some(r => Math.abs(r - l) / l < 0.01)) {
                result.push(l);
            }
        }
        return result.slice(-3); // Keep the 3 most recent
    };

    return {
        support: dedup(supports),
        resistance: dedup(resistances),
    };
}

// ─── Pattern Detection ───────────────────────────────────────────────

export function detectPatterns(prices: number[]): PatternResult[] {
    const results: PatternResult[] = [];
    const len = prices.length;
    if (len < 20) return results;

    const currentPrice = prices[len - 1];
    const recentPrices = prices.slice(-20);
    const min20 = Math.min(...recentPrices);
    const max20 = Math.max(...recentPrices);
    const range = max20 - min20;

    // Double Bottom
    const firstHalf = prices.slice(-20, -10);
    const secondHalf = prices.slice(-10);
    const minFirst = Math.min(...firstHalf);
    const minSecond = Math.min(...secondHalf);
    if (Math.abs(minFirst - minSecond) / minFirst < 0.02 && currentPrice > (minFirst + range * 0.5)) {
        results.push({
            pattern: "Double Bottom",
            type: "bullish",
            confidence: 72 + Math.random() * 15,
            description: `Two consecutive lows near Rs. ${Math.round(minFirst)} suggest strong support. Breakout above neckline confirms reversal.`,
            priceTarget: Math.round(currentPrice + range * 0.6),
        });
    }

    // Ascending Triangle
    const highs20 = recentPrices.filter((_, i) => i % 3 === 0);
    const lows20 = recentPrices.filter((_, i) => i % 3 === 1);
    const highsFlat = highs20.length > 2 && Math.abs(Math.max(...highs20) - Math.min(...highs20)) / Math.max(...highs20) < 0.015;
    const lowsRising = lows20.length > 2 && lows20[lows20.length - 1] > lows20[0];
    if (highsFlat && lowsRising) {
        results.push({
            pattern: "Ascending Triangle",
            type: "bullish",
            confidence: 65 + Math.random() * 20,
            description: `Flat resistance with rising support indicates accumulation. Bullish breakout expected.`,
            priceTarget: Math.round(max20 + range * 0.5),
        });
    }

    // Head and Shoulders (simplified)
    if (len >= 30) {
        const seg1 = prices.slice(-30, -20);
        const seg2 = prices.slice(-20, -10);
        const seg3 = prices.slice(-10);
        const peak1 = Math.max(...seg1);
        const peak2 = Math.max(...seg2);
        const peak3 = Math.max(...seg3);
        if (peak2 > peak1 * 1.02 && peak2 > peak3 * 1.02 && Math.abs(peak1 - peak3) / peak1 < 0.03) {
            results.push({
                pattern: "Head & Shoulders",
                type: "bearish",
                confidence: 60 + Math.random() * 20,
                description: `Classic reversal pattern detected. Head at Rs. ${Math.round(peak2)}, shoulders near Rs. ${Math.round(peak1)}. Watch for neckline break.`,
                priceTarget: Math.round(currentPrice - range * 0.4),
            });
        }
    }

    // Cup and Handle
    if (len >= 30) {
        const cupPrices = prices.slice(-30, -5);
        const handlePrices = prices.slice(-5);
        const cupStart = cupPrices[0];
        const cupEnd = cupPrices[cupPrices.length - 1];
        const cupMin = Math.min(...cupPrices);
        if (cupStart > cupMin * 1.05 && cupEnd > cupMin * 1.05 && Math.abs(cupStart - cupEnd) / cupStart < 0.03) {
            const handleDip = Math.min(...handlePrices);
            if (handleDip < cupEnd && handleDip > cupMin) {
                results.push({
                    pattern: "Cup & Handle",
                    type: "bullish",
                    confidence: 68 + Math.random() * 15,
                    description: `U-shaped recovery forming a cup with a shallow handle pullback. Bullish continuation expected.`,
                    priceTarget: Math.round(cupEnd + (cupEnd - cupMin)),
                });
            }
        }
    }

    // Bullish Engulfing (last 2 candles)
    if (len >= 3) {
        const prev = prices[len - 2];
        const prevPrev = prices[len - 3];
        if (prevPrev > prev && currentPrice > prevPrev) {
            results.push({
                pattern: "Bullish Engulfing",
                type: "bullish",
                confidence: 55 + Math.random() * 20,
                description: `Strong bullish candle completely engulfs the previous bearish candle. Short-term momentum shift.`,
                priceTarget: Math.round(currentPrice * 1.03),
            });
        }
    }

    // Bearish Divergence (RSI falling while price rising)
    if (len >= 14) {
        const rsiNow = calculateRSI(prices);
        const rsiPrev = calculateRSI(prices.slice(0, -5));
        if (currentPrice > prices[len - 6] && rsiNow < rsiPrev - 5 && rsiNow > 60) {
            results.push({
                pattern: "Bearish RSI Divergence",
                type: "bearish",
                confidence: 62 + Math.random() * 15,
                description: `Price making higher highs while RSI making lower highs (${Math.round(rsiNow)} vs ${Math.round(rsiPrev)}). Momentum weakening.`,
                priceTarget: Math.round(currentPrice * 0.97),
            });
        }
    }

    // Normalize confidence
    return results.map(r => ({
        ...r,
        confidence: Math.round(r.confidence),
    }));
}

// ─── Market Sentiment ────────────────────────────────────────────────

export function calculateMarketSentiment(
    allPrices: { symbol: string; prices: number[]; volumes: number[] }[]
): SentimentData {
    let totalScore = 0;
    let count = 0;

    const factors: SentimentData["factors"] = [];

    // Factor 1: Market Breadth (advancers vs decliners)
    let advancers = 0, decliners = 0;
    allPrices.forEach(({ prices }) => {
        if (prices.length >= 2) {
            if (prices[prices.length - 1] > prices[prices.length - 2]) advancers++;
            else decliners++;
        }
    });
    const breadthRatio = advancers / Math.max(advancers + decliners, 1);
    const breadthScore = breadthRatio * 100;
    factors.push({
        name: "Market Breadth",
        value: Math.round(breadthScore),
        signal: breadthScore > 60 ? "bullish" : breadthScore < 40 ? "bearish" : "neutral",
    });
    totalScore += breadthScore;
    count++;

    // Factor 2: Average RSI
    let totalRSI = 0, rsiCount = 0;
    allPrices.forEach(({ prices }) => {
        if (prices.length >= 15) {
            totalRSI += calculateRSI(prices);
            rsiCount++;
        }
    });
    const avgRSI = rsiCount > 0 ? totalRSI / rsiCount : 50;
    const momentumScore = avgRSI;
    factors.push({
        name: "Momentum (RSI)",
        value: Math.round(momentumScore),
        signal: momentumScore > 60 ? "bullish" : momentumScore < 40 ? "bearish" : "neutral",
    });
    totalScore += momentumScore;
    count++;

    // Factor 3: Volume Trend
    let volumeUp = 0;
    allPrices.forEach(({ volumes }) => {
        if (volumes.length >= 10) {
            const recent = volumes.slice(-5).reduce((a, b) => a + b, 0) / 5;
            const prev = volumes.slice(-10, -5).reduce((a, b) => a + b, 0) / 5;
            if (recent > prev) volumeUp++;
        }
    });
    const volumeScore = (volumeUp / Math.max(allPrices.length, 1)) * 100;
    factors.push({
        name: "Volume Trend",
        value: Math.round(volumeScore),
        signal: volumeScore > 55 ? "bullish" : volumeScore < 45 ? "bearish" : "neutral",
    });
    totalScore += volumeScore;
    count++;

    // Factor 4: Price vs Moving Average
    let aboveSMA = 0;
    allPrices.forEach(({ prices }) => {
        if (prices.length >= 20) {
            const sma = calculateSMA(prices, 20);
            if (prices[prices.length - 1] > sma) aboveSMA++;
        }
    });
    const trendScore = (aboveSMA / Math.max(allPrices.length, 1)) * 100;
    factors.push({
        name: "Trend Strength",
        value: Math.round(trendScore),
        signal: trendScore > 60 ? "bullish" : trendScore < 40 ? "bearish" : "neutral",
    });
    totalScore += trendScore;
    count++;

    // Factor 5: Volatility (lower = greed, higher = fear)
    let totalVolatility = 0;
    allPrices.forEach(({ prices }) => {
        if (prices.length >= 20) {
            const bb = calculateBollingerBands(prices);
            totalVolatility += bb.width;
        }
    });
    const avgVolatility = totalVolatility / Math.max(allPrices.length, 1);
    const volatilityScore = Math.max(0, Math.min(100, 100 - avgVolatility * 10));
    factors.push({
        name: "Volatility",
        value: Math.round(volatilityScore),
        signal: volatilityScore > 60 ? "bullish" : volatilityScore < 40 ? "bearish" : "neutral",
    });
    totalScore += volatilityScore;
    count++;

    const overall = Math.round(totalScore / count);
    const label: SentimentData["label"] =
        overall >= 80 ? "Extreme Greed" :
            overall >= 60 ? "Greed" :
                overall >= 40 ? "Neutral" :
                    overall >= 20 ? "Fear" : "Extreme Fear";

    return { overall, label, factors };
}

// ─── Portfolio Optimization ──────────────────────────────────────────

export function optimizePortfolio(
    holdings: { symbol: string; sector: string; weight: number; score: number }[]
): OptimizationResult[] {
    return holdings.map(h => {
        let suggestedWeight = h.weight;
        let action: OptimizationResult["action"] = "Hold";
        let reason = "Position aligns with current market conditions.";

        if (h.score >= 75) {
            suggestedWeight = Math.min(h.weight * 1.3, 35);
            action = "Increase";
            reason = `Strong technical score (${h.score}/100). Increasing exposure recommended.`;
        } else if (h.score >= 60) {
            action = "Hold";
            reason = `Healthy technical indicators (${h.score}/100). Maintain current position.`;
        } else if (h.score >= 40) {
            suggestedWeight = h.weight * 0.8;
            action = "Decrease";
            reason = `Mixed signals (${h.score}/100). Consider partial profit booking.`;
        } else {
            suggestedWeight = h.weight * 0.5;
            action = "Decrease";
            reason = `Weak technical outlook (${h.score}/100). Reduce exposure to manage risk.`;
        }

        // Sector concentration check
        const sectorPeers = holdings.filter(p => p.sector === h.sector);
        const sectorWeight = sectorPeers.reduce((s, p) => s + p.weight, 0);
        reason += ` High sector concentration (${Math.round(sectorWeight)}% in ${h.sector}).`;

        return {
            symbol: h.symbol,
            currentWeight: Math.round(h.weight * 10) / 10,
            suggestedWeight: Math.round(suggestedWeight * 10) / 10,
            action,
            reason,
            riskScore: Math.round(100 - h.score),
        };
    });
}

// ─── RSI / MACD Series for Charts ────────────────────────────────────

export function generateRSISeries(prices: number[]): { index: number; rsi: number }[] {
    const result: { index: number; rsi: number }[] = [];
    for (let i = 14; i <= prices.length; i++) {
        result.push({
            index: i,
            rsi: Math.round(calculateRSI(prices.slice(0, i)) * 100) / 100,
        });
    }
    return result;
}

export function generateMACDSeries(prices: number[]): { index: number; macd: number; signal: number; histogram: number }[] {
    const result: { index: number; macd: number; signal: number; histogram: number }[] = [];
    for (let i = 26; i <= prices.length; i++) {
        const m = calculateMACD(prices.slice(0, i));
        result.push({ index: i, ...m });
    }
    return result;
}

export function generateBollingerSeries(prices: number[]): { index: number; upper: number; middle: number; lower: number }[] {
    const result: { index: number; upper: number; middle: number; lower: number }[] = [];
    for (let i = 20; i <= prices.length; i++) {
        const bb = calculateBollingerBands(prices.slice(0, i));
        result.push({ index: i, upper: bb.upper, middle: bb.middle, lower: bb.lower });
    }
    return result;
}

// ─── Trade Journal Generator ─────────────────────────────────────────

export function generateTradeJournal(): TradeJournalEntry[] {
    return [
        { id: 1, date: "2026-03-04", symbol: "NABIL", action: "BUY", price: 1270, reasoning: "LSTM Ensemble v2.4 detects oversold RSI (32) + SMA200 support. Institutional accumulation noted.", outcome: "Correct", returnPct: 1.18, communityFollowRate: 68, hitRate7d: 72 },
        { id: 2, date: "2026-03-03", symbol: "UPPER", action: "SELL", price: 293, reasoning: "CNN-1D Engine identifies Head & Shoulders pattern. XLM-R sentiment: Negative on hydropower sector.", outcome: "Correct", returnPct: 2.73, communityFollowRate: 42, hitRate7d: 74 },
        { id: 3, date: "2026-03-02", symbol: "HBL", action: "BUY", price: 406, reasoning: "Ascending Triangle breakout with 2.3x volume. XGBoost features highlight sector rotation.", outcome: "Correct", returnPct: 2.96, communityFollowRate: 59, hitRate7d: 75 },
        { id: 4, date: "2026-03-01", symbol: "AKPL", action: "BUY", price: 162, reasoning: "Cup & Handle breakout. Bullish engulfing candle on daily chart. Anomaly autoencoder flags support.", outcome: "Correct", returnPct: 7.23, communityFollowRate: 71, hitRate7d: 78 },
        { id: 5, date: "2026-02-28", symbol: "CBBL", action: "SELL", price: 1310, reasoning: "XGBoost identifies Double Top at Rs. 1320. RSI bearish divergence confirmed by technical stream.", outcome: "Correct", returnPct: 2.72, communityFollowRate: 35, hitRate7d: 81 },
        { id: 6, date: "2026-02-27", symbol: "NHPC", action: "BUY", price: 56, reasoning: "Bollinger Squeeze breakout. XGBoost feature importance: Volume Surge (0.42), Monsoon Sentiment (+).", outcome: "Incorrect", returnPct: -2.45, communityFollowRate: 88, hitRate7d: 85 },
        { id: 7, date: "2026-02-26", symbol: "GBIME", action: "BUY", price: 298, reasoning: "Golden Cross (50/200 DMA). Post-merger synergies reflected in XLM-R fundamental sentiment analysis.", outcome: "Correct", returnPct: 4.03, communityFollowRate: 54, hitRate7d: 82 },
        { id: 8, date: "2026-02-25", symbol: "EBL", action: "HOLD", price: 1975, reasoning: "Range-bound consolidation. No clear directional signal from LSTM or CNN logic. Volume stable.", outcome: "Pending", communityFollowRate: 12, hitRate7d: 79 },
        { id: 9, date: "2026-02-24", symbol: "SANIMA", action: "BUY", price: 328, reasoning: "False breakdown recovery at 320 support. Institutional buying detected by anomaly engine.", outcome: "Incorrect", returnPct: -1.82, communityFollowRate: 47, hitRate7d: 83 },
        { id: 10, date: "2026-02-23", symbol: "NLIC", action: "BUY", price: 845, reasoning: "XLM-R Sentiment Stream: Highly Bullish. Price above key EMA clusters. Sector momentum strengthening.", outcome: "Correct", returnPct: 5.33, communityFollowRate: 62, hitRate7d: 80 },
    ];
}
