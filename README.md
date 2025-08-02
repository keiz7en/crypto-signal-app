# Crypto Signal App with Real-Time Binance & CoinGlass Integration

A Next.js application that provides real-time cryptocurrency trading signals by analyzing Binance market data and
CoinGlass liquidation data.

## Features

- **Real-time Binance API Integration**: Fetches live price, volume, funding rates, and technical indicators
- **CoinGlass Liquidation Analysis**: Analyzes liquidation data to identify potential long/short opportunities
- **Advanced Technical Analysis**: Bollinger Bands, EMA crossovers, trend analysis
- **Signal Generation**: Generates trading signals with confidence levels:
    - 🔁 REVERSAL STARTED - LONG/SHORT
    - 📈 LONG GOING / 📉 SHORT GOING
    - ⚠️ LONG/SHORT RISKY TODAY
    - ⚪ NO SIGNAL (STAY AWAY)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Binance API credentials:
   ```
   BINANCE_API_KEY=your_api_key_here
   BINANCE_API_SECRET=your_api_secret_here
   ```

3. **Get Binance API Keys**
    - Go to [Binance API Management](https://www.binance.com/en/my/settings/api-management)
    - Create a new API key
    - Enable "Enable Reading" permission (no trading permissions needed)
    - Copy your API Key and Secret Key

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open the Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### Data Sources

- **Binance API**: Real-time price, volume, funding rates, long/short ratios, open interest
- **CoinGlass API**: Liquidation data across different timeframes (1h, 4h, 24h)

### Technical Analysis

- **Trend Analysis**: 5-minute and 15-minute trend detection
- **Bollinger Bands**: Breakout detection above/below bands
- **EMA Crossover**: 9-period and 21-period exponential moving average crossovers
- **Volume Analysis**: Delta volume for buy/sell pressure
- **Funding Rate Analysis**: Market sentiment through futures funding

### Signal Logic

The app analyzes multiple factors to generate signals:

1. **Bullish Signals**:
    - Upward trends on multiple timeframes
    - Bollinger band upper breakout
    - Bullish EMA crossover
    - Negative funding rate (shorts paying longs)
    - More shorts than longs in the market
    - Short liquidation spikes

2. **Bearish Signals**:
    - Downward trends on multiple timeframes
    - Bollinger band lower breakdown
    - Bearish EMA crossover
    - Positive funding rate (longs paying shorts)
    - More longs than shorts in the market
    - Long liquidation spikes

### Confidence Scoring

- Signals require minimum 70% confidence to be displayed
- Confidence increases with more confirming indicators
- News sentiment can adjust confidence by ±10%

## Supported Cryptocurrencies

The app analyzes 20 major cryptocurrencies:

- BTC, ETH, BNB, XRP, SOL, DOGE, ADA, DOT, LTC, BCH
- AVAX, LINK, MATIC, UNI, ATOM, FTM, NEAR, ALGO, VET, ICP

## API Endpoints

- `GET /api/signals` - Returns current trading signals for all monitored coins

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Axios**: HTTP client for API requests
- **Recharts**: Charts and data visualization

## Risk Disclaimer

This application is for educational and informational purposes only. Trading cryptocurrencies involves substantial risk
and may result in significant losses. Always do your own research and never invest more than you can afford to lose.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details