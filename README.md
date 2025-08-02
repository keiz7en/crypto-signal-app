# Crypto Signal App with Real-Time Binance & CoinGlass Integration

A powerful Next.js application that provides AI-powered cryptocurrency trading signals by analyzing real-time data from
Binance and
CoinGlass liquidation data.

## 🚀 Features

- **Real-Time Binance Data**: Live price feeds, volume, open interest, funding rates
- **CoinGlass Liquidation Analysis**: Analyzes liquidation data to identify potential market movements
- **AI-Powered Analysis**: Uses OpenAI GPT-4 for intelligent signal validation and market analysis
- **Technical Indicators**: Bollinger Bands, EMA crossovers, trend analysis
- **News Sentiment**: Integrates crypto news analysis for comprehensive market context
- **150+ Cryptocurrencies**: Supports all major Binance trading pairs
- **Modern UI**: Clean, responsive interface with dark/light mode support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **APIs**: Binance API, CoinGlass API, OpenAI API, News APIs
- **Deployment**: Render (with npm support)

## 📊 Live Demo

🔗 **[https://crypto-signal-app-15ka.onrender.com](https://crypto-signal-app-15ka.onrender.com)**

## 🔧 Local Development

### Prerequisites

- Node.js 18+
- npm (not pnpm)
- OpenAI API Key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/keiz7en/crypto-signal-app
cd crypto-signal-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

```env
# OpenAI API Configuration (Required)
OPENAI_API_KEY=your_openai_api_key_here

# Binance API Configuration (Optional - for enhanced data)
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_API_SECRET=your_binance_api_secret_here

# News API Configuration (Optional)
NEWS_API_KEY=your_news_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment on Render

This app is optimized for deployment on Render. The repository includes:

- `render.yaml` - Deployment configuration with environment variables
- Proper npm configuration (no pnpm dependencies)
- Next.js production optimizations

### Deploy to Render:

1. **Connect your GitHub repository** to Render
2. **Use these settings**:
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `npm start`
    - **Node Version**: 18+

3. **Set environment variables** in Render dashboard:
    - `OPENAI_API_KEY` - Your OpenAI API key
    - `NODE_ENV` - production
    - (Optional) `BINANCE_API_KEY`, `NEWS_API_KEY`

## 📈 How It Works

### 1. Data Collection

- **Binance API**: Real-time price, volume, funding rates, open interest
- **CoinGlass API**: Liquidation data across multiple exchanges
- **News APIs**: Crypto-related news and sentiment analysis

### 2. Technical Analysis

- **Trend Detection**: 5min and 15min timeframe analysis
- **Bollinger Bands**: Breakout detection for volatility signals
- **EMA Crossovers**: 9/21 period exponential moving average analysis
- **Funding Rate Analysis**: Identifies market sentiment from futures funding

### 3. AI Enhancement

- **Signal Validation**: OpenAI GPT-4 validates technical signals
- **Risk Assessment**: AI-powered risk level analysis
- **News Integration**: Correlates news sentiment with technical signals
- **Market Context**: Provides reasoning for each trading recommendation

### 4. CoinGlass Liquidation Analysis

- **Real-time liquidation tracking** from https://www.coinglass.com/LiquidationData
- **Long vs Short liquidation ratios**
- **Liquidation spike detection** for potential reversal signals
- **Multi-timeframe analysis** (1h, 4h, 24h)

## 🔑 API Keys Setup

### OpenAI API Key (Required)

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add credits to your account for API usage
4. Add to your `.env` file

### Binance API Key (Optional)

1. Visit [Binance API Management](https://www.binance.com/en/my/settings/api-management)
2. Create a new API key with **Read Only** permissions
3. Enable **Futures** permissions for funding rate data
4. Add to your `.env` file

### News API Key (Optional)

1. Visit [NewsAPI](https://newsapi.org/register)
2. Get your free API key
3. Add to your `.env` file

## 📊 Features Overview

### Trading Signals

- **🔁 REVERSAL STARTED**: High-confidence trend reversal signals
- **📈 LONG GOING / 📉 SHORT GOING**: Trend continuation signals
- **⚠️ RISKY**: Low-confidence or conflicting signals
- **⚪ NO SIGNAL**: No clear trading direction

### AI Analysis

- **Signal Validation**: AI confirms or rejects technical signals
- **Risk Assessment**: LOW/MEDIUM/HIGH/EXTREME risk levels
- **News Sentiment**: BULLISH/BEARISH/NEUTRAL market sentiment
- **Trading Recommendations**: Specific actionable advice

### Real-Time Data

- **150+ Cryptocurrencies**: All major Binance pairs
- **Live Price Updates**: Real-time price monitoring
- **Volume Analysis**: 24h volume and delta volume tracking
- **Liquidation Tracking**: Real-time liquidation data from CoinGlass

## 🔍 AI Search Features

The app includes an advanced AI search interface:

- **Crypto Opportunity Search**: Find the best trading opportunities
- **Specific Coin Analysis**: Deep-dive analysis for any cryptocurrency
- **Market Questions**: Ask AI about crypto markets and trading strategies

## ⚠️ Disclaimer

This application is for **educational and informational purposes only**.

- **Not Financial Advice**: All signals and analysis are for educational purposes
- **High Risk**: Cryptocurrency trading involves substantial risk
- **Do Your Research**: Always conduct your own analysis before trading
- **Use Stop Losses**: Implement proper risk management strategies

## 🛡️ Risk Management

- **Position Sizing**: Never risk more than 2-5% per trade
- **Stop Losses**: Always use stop losses to limit downside
- **Diversification**: Don't put all funds in one cryptocurrency
- **Paper Trading**: Test strategies with paper trading first

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live App**: [https://crypto-signal-app-15ka.onrender.com](https://crypto-signal-app-15ka.onrender.com)
- **GitHub**: [https://github.com/keiz7en/crypto-signal-app](https://github.com/keiz7en/crypto-signal-app)
- **CoinGlass**: [https://www.coinglass.com/LiquidationData](https://www.coinglass.com/LiquidationData)

---

Built with ❤️ using Next.js, OpenAI, and real-time crypto data APIs.