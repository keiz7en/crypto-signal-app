/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['node-binance-api', 'openai']
    },
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        BINANCE_API_KEY: process.env.BINANCE_API_KEY,
        BINANCE_API_SECRET: process.env.BINANCE_API_SECRET,
        NEWS_API_KEY: process.env.NEWS_API_KEY,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    // Optimize for production
    swcMinify: true,
    poweredByHeader: false,
    // Handle external packages
    webpack: (config) => {
        config.externals.push({
            'supports-color': 'supports-color'
        })
        // Ignore node-specific modules in browser bundle
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
            crypto: false,
        }
        return config
    },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
