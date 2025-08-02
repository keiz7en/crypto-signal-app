export type TrendDirection = "LONG" | "SHORT" | "NEUTRAL"

export interface BinanceData {
  coin: string
  currentPrice: number // This will be mocked
  volume: number
  openInterest: number
  fundingRate: number
  longShortRatio: number
  deltaVolume: number // Positive for buy pressure, negative for sell pressure
  trend5min: TrendDirection
  trend15min: TrendDirection
  bollingerBandBreakout: "UP" | "DOWN" | "NONE"
  emaCrossover: "BULLISH" | "BEARISH" | "NONE"
}

export interface CoinglassData {
  coin: string
  totalLiquidations1h: number
  longLiquidations1h: number
  shortLiquidations1h: number
  totalLiquidations4h: number
  longLiquidations4h: number
  shortLiquidations4h: number
  totalLiquidations24h: number
  longLiquidations24h: number
  shortLiquidations24h: number
  liquidationSpike: "LONG" | "SHORT" | "NONE" // Indicates a significant spike in liquidations
}

export type NewsSentiment = "BULLISH" | "BEARISH" | "NEUTRAL"

export type NewsItem = {
    title: string
    summary: string
    url: string
    publishedAt: string
    sentiment: NewsSentiment
    impact: "HIGH" | "MEDIUM" | "LOW"
    relevantCoins: string[]
}

export type AIAnalysis = {
    signalValidation: {
        isValid: boolean
        confidence: number
        reasoning: string
        suggestedAction: string
    }
    newsAnalysis: {
        overallSentiment: NewsSentiment
        keyNews: NewsItem[]
        marketContext: string
    }
    riskAssessment: {
        level: "LOW" | "MEDIUM" | "HIGH" | "EXTREME"
        factors: string[]
        warnings: string[]
    }
}

export type SignalOutput = {
  coin: string
  currentPrice: number
  signal:
    | "🔁 REVERSAL STARTED - LONG"
    | "🔁 REVERSAL STARTED - SHORT"
    | "📈 LONG GOING"
    | "📉 SHORT GOING"
    | "⚠️ LONG RISKY TODAY"
    | "⚠️ SHORT RISKY TODAY"
    | "⚪ NO SIGNAL (STAY AWAY)"
    confidence: number
  trendSummary: string[]
  suggestedAction: string
    aiAnalysis?: AIAnalysis
}
