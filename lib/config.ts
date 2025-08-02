// Configuration for API keys and settings
export const config = {
    // Binance API Configuration
    binance: {
        apiKey: process.env.BINANCE_API_KEY || '',
        apiSecret: process.env.BINANCE_API_SECRET || '',
        baseUrl: 'https://api.binance.com',
        futuresBaseUrl: 'https://fapi.binance.com'
    },

    // CoinGlass API Configuration
    coinglass: {
        baseUrl: 'https://open-api.coinglass.com',
        // CoinGlass public API doesn't require API key for basic liquidation data
    },

    // OpenAI Configuration for AI analysis
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4o-mini', // Fast and cost-effective model
        maxTokens: 1000
    },

    // News API Configuration
    news: {
        newsApiKey: process.env.NEWS_API_KEY || '',
        cryptoNewsApiKey: process.env.CRYPTO_NEWS_API_KEY || '',
        baseUrl: 'https://newsapi.org/v2',
        cryptoNewsUrl: 'https://cryptonews-api.com/api/v1'
    },

    // Rate limiting settings
    rateLimit: {
        binanceRequestsPerSecond: 10,
        coinglassRequestsPerSecond: 5,
        openaiRequestsPerMinute: 20,
        newsRequestsPerHour: 100
    },

    // Analysis settings
    analysis: {
        minimumConfidence: 70,
        maxCoinsToAnalyze: 20,
        aiAnalysisEnabled: true,
        newsAnalysisEnabled: true,
        technicalIndicators: {
            bollinger: {
                period: 20,
                deviation: 2
            },
            ema: {
                fastPeriod: 9,
                slowPeriod: 21
            },
            trend: {
                shortPeriod: 5,
                longPeriod: 15,
                changeThreshold: 0.002
            }
        }
    },

    // AI Analysis settings
    ai: {
        signalValidationEnabled: true,
        newsAnalysisEnabled: true,
        riskAssessmentEnabled: true,
        maxNewsArticles: 5,
        analysisTimeout: 10000 // 10 seconds
    }
}

export default config