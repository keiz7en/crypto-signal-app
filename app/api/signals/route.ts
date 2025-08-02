import {NextRequest, NextResponse} from "next/server"
import {
    generateSignal,
    getRealBinanceData,
    getRealCoinglassData,
    searchBestCryptoOpportunities,
    getComprehensiveCryptoAnalysis
} from "@/lib/utils"
import {getCryptoNews, analyzeSignalWithAI, analyzeNewsSentiment} from "@/lib/ai-analysis"
import {config} from "@/lib/config"
import type { SignalOutput } from "@/lib/types"

export const dynamic = "force-dynamic" // Ensure this API route is dynamic

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const coin = searchParams.get('coin')

    try {
        if (action === 'search-opportunities') {
            // Search for best crypto opportunities across multiple coins
            const coins = searchParams.get('coins')?.split(',') || [
                'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'SOLUSDT',
                'DOGEUSDT', 'ADAUSDT', 'DOTUSDT', 'LTCUSDT', 'BCHUSDT',
                'AVAXUSDT', 'LINKUSDT', 'MATICUSDT', 'UNIUSDT', 'ATOMUSDT'
            ]

            const opportunities = await searchBestCryptoOpportunities(coins)

            return NextResponse.json({
                success: true,
                opportunities: opportunities.slice(0, 10), // Top 10 opportunities
                timestamp: new Date().toISOString(),
                message: `Found ${opportunities.length} crypto opportunities, showing top 10`
            })
        }

        if (action === 'analyze' && coin) {
            // Comprehensive analysis for a specific coin with AI
            const analysis = await getComprehensiveCryptoAnalysis(coin.toUpperCase())
            const signal = await generateSignal(
                analysis.binanceData,
                analysis.coinglassData,
                analysis.marketSentiment
            )

            // Get news and AI analysis
            const news = await getCryptoNews(coin)
            const aiAnalysis = await analyzeSignalWithAI(
                signal,
                analysis.binanceData,
                analysis.coinglassData,
                news
            )

            return NextResponse.json({
                success: true,
                coin: coin.toUpperCase(),
                signal,
                binanceData: analysis.binanceData,
                coinglassData: analysis.coinglassData,
                marketSentiment: analysis.marketSentiment,
                aiRecommendation: analysis.aiRecommendation,
                aiAnalysis,
                news: news.slice(0, 3), // Top 3 relevant news
                timestamp: new Date().toISOString()
            })
        }

        // Default behavior - process all coins
        const coins = [
            // Major cryptocurrencies
            "BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "SOLUSDT", "DOGEUSDT", "ADAUSDT", "DOTUSDT", "LTCUSDT", "BCHUSDT",

            // DeFi & Layer 1
            "AVAXUSDT", "LINKUSDT", "MATICUSDT", "UNIUSDT", "ATOMUSDT", "FTMUSDT", "NEARUSDT", "ALGOUSDT", "VETUSDT", "ICPUSDT",

            // Layer 2 & Scaling
            "ARBUSDT", "OPUSDT", "LRCUSDT", "IMXUSDT", "STRKUSDT",

            // Meme Coins
            "SHIBUSDT", "PEPEUSDT", "FLOKIUSDT", "BONKUSDT", "WIFUSDT", "BOMEUSDT", "MEMEUSDT",

            // AI & Technology
            "AIUSDT", "FETUSDT", "AGIXUSDT", "RNDRUSDT", "OCEANUSDT", "THETAUSDT", "FILUSDT",

            // Gaming & Metaverse
            "AXSUSDT", "SANDUSDT", "MANAUSDT", "ENJUSDT", "GALAUSDT", "CHZUSDT", "FLOWUSDT",

            // Exchange Tokens
            "CAKEUSDT", "CRVUSDT", "COMPUSDT", "MKRUSDT", "AAVEUSDT", "SUSHIUSDT", "1INCHUSDT",

            // Storage & Infrastructure
            "ARUSDT", "STORJUSDT", "SCUSDT", "ZENUSDT", "HBARUSDT", "IOTAUSDT",

            // Privacy Coins
            "XMRUSDT", "ZECUSDT", "DASHUSDT", "ZRXUSDT",

            // Stablecoins & Wrapped Assets
            "WBTCUSDT", "STETHUSDT", "RETHUSDT",

            // Enterprise & Business
            "XLMUSDT", "TRXUSDT", "EOSUSDT", "NEOUSDT", "ONTUSDT", "QTUMUSDT",

            // New & Trending
            "SUIUSDT", "APTUSDT", "INJUSDT", "SEIUSDT", "TIAUSDT", "DYMUSDT", "ARKMUSDT", "PYTHUSDT",

            // Oracles & Data
            "BANDUSDT", "APIUSDT", "TLMUSDT",

            // Cross-chain & Interoperability
            "KSMUSDT", "RUNEUSDT", "CELRUSDT",

            // Social & Creator Economy
            "AUDIOUSDT",

            // Traditional Finance Bridge
            "PAXGUSDT", "GOLDUSDT",

            // Additional Major Coins
            "ETCUSDT", "XTZUSDT", "WAVESUSDT", "RVNUSDT", "ZILUSDT", "BATUSDT", "KNCUSDT",
            "RSRUSDT", "NKNUSDT", "CTKUSDT", "CHRUSDT", "DNTUSDT", "OGNUSDT", "DGBUSDT", "BTSUSDT",
            "REPUSDT", "HOTUSDT", "DUSKUSDT", "ANKRUSDT", "WINUSDT", "COSUSDT", "COCOSUSDT",
            "MTLUSDT", "TOMOUSDT", "PERLUSDT", "DENTUSDT", "MFTUSDT", "KEYUSDT", "STORMUSDT", "DOCKUSDT",
            "WANUSDT", "FUNUSDT", "CVCUSDT", "BTTUSDT", "WAXPUSDT", "HIVEUSDT", "RIFUSDT",

            // Newer Listings & Trending
            "JUPUSDT", "WUSDT", "ALTUSDT", "MANTAUSDT", "ONDOUSDT", "JITOUSDT", "STXUSDT", "ACEUSDT",
            "NFPUSDT", "XAIUSDT", "CFXUSDT", "JOEUSDT", "TRBUSDT", "ORDIUSDT", "BEAMXUSDT",
            "PIVXUSDT", "VICUSDT", "BLURUSDT", "VANRYUSDT", "AEVOUSDT", "PIXELUSDT", "STRAXUSDT",
            "BIGTIMEUSDT", "BONDUSDT"
        ]

        console.log(`🚀 Processing ALL ${coins.length} Binance coins with AI analysis...`)

        const startTime = Date.now()
        const signals: SignalOutput[] = []

        try {
            // Process ALL coins in parallel with proper batching for maximum speed
            const BATCH_SIZE = 12 // Slightly smaller batches due to AI processing
            const batches = []

            for (let i = 0; i < coins.length; i += BATCH_SIZE) {
                batches.push(coins.slice(i, i + BATCH_SIZE))
            }

            console.log(`📊 Processing ${batches.length} batches of ${BATCH_SIZE} coins each with AI analysis`)

            // Process all batches in parallel for maximum speed
            const allBatchPromises = batches.map(async (batch, batchIndex) => {
                console.log(`🔄 Batch ${batchIndex + 1}/${batches.length}: ${batch.join(', ')}`)

                const batchPromises = batch.map(async (coin) => {
                    try {
                        // Set aggressive timeout but keep parallel processing
                        const timeoutPromise = new Promise((_, reject) => {
                            setTimeout(() => reject(new Error('Timeout')), 8000) // 8 second timeout for AI processing
                        })

                        const dataPromise = (async () => {
                            // Get market data in parallel
                            const [binanceData, coinglassData] = await Promise.all([
                                getRealBinanceData(coin),
                                getRealCoinglassData(coin)
                            ])

                            // Get news and analyze sentiment
                            const news = await getCryptoNews(coin)
                            const newsSentiment = await analyzeNewsSentiment(news)

                            // Generate initial signal
                            const signal = await generateSignal(binanceData, coinglassData, newsSentiment)

                            // Add AI analysis for high-value coins or high-confidence signals
                            const shouldAnalyzeWithAI = signal.confidence >= 60 ||
                                ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'SOLUSDT'].includes(coin)

                            if (shouldAnalyzeWithAI && config.analysis.aiAnalysisEnabled) {
                                try {
                                    const aiAnalysis = await analyzeSignalWithAI(signal, binanceData, coinglassData, news)
                                    if (aiAnalysis) {
                                        signal.aiAnalysis = aiAnalysis
                                        // Adjust confidence based on AI validation
                                        if (!aiAnalysis.signalValidation.isValid) {
                                            signal.confidence = Math.min(signal.confidence, 60)
                                        }
                                    }
                                } catch (aiError) {
                                    console.log(`AI analysis failed for ${coin}, continuing with technical analysis`)
                                }
                            }

                            return signal
                        })()

                        const signal = await Promise.race([dataPromise, timeoutPromise]) as SignalOutput
                        return signal

                    } catch (error) {
                        // Fast fallback - still return a signal
                        console.log(`⚠️ ${coin}: Using fallback analysis`)
                        const binanceData = await getRealBinanceData(coin)
                        const coinglassData = await getRealCoinglassData(coin)
                        const signal = await generateSignal(binanceData, coinglassData, 'NEUTRAL')
                        return signal
                    }
                })

                const batchResults = await Promise.allSettled(batchPromises)
                return batchResults
                    .filter(result => result.status === 'fulfilled')
                    .map(result => (result as PromiseFulfilledResult<SignalOutput>).value)
            })

            // Wait for all batches to complete
            const allResults = await Promise.all(allBatchPromises)

            // Flatten results
            allResults.forEach(batchResults => {
                signals.push(...batchResults)
            })

            const endTime = Date.now()
            const totalTime = (endTime - startTime) / 1000
            console.log(`⚡ Completed AI-enhanced analysis of ${signals.length}/${coins.length} coins in ${totalTime.toFixed(2)}s`)

            // Sort by confidence and AI validation
            signals.sort((a, b) => {
                // Prioritize AI-validated signals
                if (a.aiAnalysis?.signalValidation.isValid && !b.aiAnalysis?.signalValidation.isValid) return -1
                if (!a.aiAnalysis?.signalValidation.isValid && b.aiAnalysis?.signalValidation.isValid) return 1

                // Prioritize non-"NO SIGNAL" results
                if (a.signal === "⚪ NO SIGNAL (STAY AWAY)" && b.signal !== "⚪ NO SIGNAL (STAY AWAY)") return 1
                if (b.signal === "⚪ NO SIGNAL (STAY AWAY)" && a.signal !== "⚪ NO SIGNAL (STAY AWAY)") return -1

                // Then sort by confidence
                return b.confidence - a.confidence
            })

            // Filter high confidence signals, but ensure we show good results
            const highConfidenceSignals = signals.filter((s) => s.confidence >= 70)
            const aiValidatedSignals = signals.filter((s) => s.aiAnalysis?.signalValidation.isValid)

            const finalSignals = highConfidenceSignals.length >= 10 ?
                highConfidenceSignals :
                signals.slice(0, 25) // Show top 25 if not enough high-confidence

            return NextResponse.json({
                signals: finalSignals,
                metadata: {
                    totalProcessed: signals.length,
                    totalCoins: coins.length,
                    highConfidenceCount: highConfidenceSignals.length,
                    aiValidatedCount: aiValidatedSignals.length,
                    processingTimeMs: endTime - startTime,
                    timestamp: new Date().toISOString(),
                    aiAnalysisEnabled: config.analysis.aiAnalysisEnabled
                }
            })

        } catch (error) {
            console.error("❌ Error processing signals:", error)
            return NextResponse.json({
                error: "Processing error",
                signals: signals.slice(0, 10),
                metadata: {
                    totalProcessed: signals.length,
                    totalCoins: coins.length,
                    highConfidenceCount: 0,
                    aiValidatedCount: 0,
                    processingTimeMs: Date.now() - startTime,
                    timestamp: new Date().toISOString(),
                    aiAnalysisEnabled: false
                }
            }, {status: 500})
        }
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch crypto analysis',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        }, {status: 500})
    }
}
