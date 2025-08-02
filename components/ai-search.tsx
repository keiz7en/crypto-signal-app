"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {useToast} from "@/hooks/use-toast"
import {
    Search,
    Loader2,
    Bot,
    Info,
    TrendingUp,
    AlertTriangle,
    MessageSquare,
    BarChart3,
    RefreshCw
} from "lucide-react"

interface AISearchResponse {
    query: string
    response: string
    timestamp: string
}

export function AISearch() {
    const [query, setQuery] = useState("")
    const [response, setResponse] = useState("")
    const [opportunities, setOpportunities] = useState<any[]>([])
    const [selectedCoin, setSelectedCoin] = useState("")
    const [coinAnalysis, setCoinAnalysis] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("search") // "search", "opportunities", "analyze"
    const {toast} = useToast()

    const handleSearch = async () => {
        if (!query.trim()) {
            toast({
                title: "Enter a question",
                description: "Please enter a crypto-related question to search.",
                variant: "destructive"
            })
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch('/api/ai-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query: query.trim()})
            })

            if (!res.ok) {
                throw new Error('Search failed')
            }

            const data: AISearchResponse = await res.json()
            setResponse(data.response)

            toast({
                title: "🤖 AI Analysis Complete",
                description: "Got your crypto analysis results!"
            })

        } catch (error) {
            console.error('AI search error:', error)
            toast({
                title: "Search Failed",
                description: "AI search is currently unavailable. Please try again later.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSearch()
        }
    }

    const searchOpportunities = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/signals?action=search-opportunities')
            const data = await response.json()

            if (data.success) {
                setOpportunities(data.opportunities)
                setActiveTab("opportunities")
            } else {
                setResponse(`Error: ${data.message}`)
            }
        } catch (error) {
            setResponse("Failed to search opportunities. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const analyzeCoin = async (coin: string) => {
        if (!coin) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/signals?action=analyze&coin=${coin.toUpperCase()}`)
            const data = await response.json()

            if (data.success) {
                setCoinAnalysis(data)
                setActiveTab("analyze")
            } else {
                setResponse(`Error analyzing ${coin}: ${data.message}`)
            }
        } catch (error) {
            setResponse(`Failed to analyze ${coin}. Please try again.`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5"/>
                    AI Crypto Analysis & Opportunity Search
                </CardTitle>
                <CardDescription>
                    Search crypto opportunities, analyze specific coins, or ask AI questions about the crypto market
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Tab Selection */}
                <div className="flex gap-2 mb-4">
                    <Button
                        variant={activeTab === "search" ? "default" : "outline"}
                        onClick={() => setActiveTab("search")}
                        size="sm"
                    >
                        <MessageSquare className="w-4 h-4 mr-2"/>
                        AI Search
                    </Button>
                    <Button
                        variant={activeTab === "opportunities" ? "default" : "outline"}
                        onClick={searchOpportunities}
                        size="sm"
                        disabled={isLoading}
                    >
                        <TrendingUp className="w-4 h-4 mr-2"/>
                        Find Opportunities
                    </Button>
                    <Button
                        variant={activeTab === "analyze" ? "default" : "outline"}
                        onClick={() => setActiveTab("analyze")}
                        size="sm"
                    >
                        <BarChart3 className="w-4 h-4 mr-2"/>
                        Analyze Coin
                    </Button>
                </div>

                {/* AI Search Tab */}
                {activeTab === "search" && (
                    <>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ask about crypto markets, trading strategies, or specific cryptocurrencies..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                className="flex-1"
                            />
                            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                ) : (
                                    <Search className="w-4 h-4"/>
                                )}
                            </Button>
                        </div>

                        {/* Suggested queries for crypto */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                "What are the best cryptocurrencies to trade today?",
                                "Explain Bitcoin liquidation data",
                                "How does funding rate affect crypto prices?",
                                "What is a good long/short ratio for trading?",
                                "Analyze Ethereum market sentiment"
                            ].map((suggestion) => (
                                <Button
                                    key={suggestion}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setQuery(suggestion)
                                        handleSearch()
                                    }}
                                    className="text-xs"
                                    disabled={isLoading}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>

                        {response && (
                            <div className="bg-muted/50 rounded-lg p-4">
                                <div className="whitespace-pre-wrap text-sm">{response}</div>
                            </div>
                        )}
                    </>
                )}

                {/* Opportunities Tab */}
                {activeTab === "opportunities" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Top Crypto Opportunities</h3>
                            <Button onClick={searchOpportunities} disabled={isLoading} size="sm">
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2"/>
                                ) : (
                                    <RefreshCw className="w-4 h-4 mr-2"/>
                                )}
                                Refresh
                            </Button>
                        </div>

                        {opportunities.length > 0 && (
                            <div className="grid gap-3">
                                {opportunities.map((opp, index) => (
                                    <Card key={opp.coin} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="font-mono">
                                                    #{index + 1}
                                                </Badge>
                                                <div>
                                                    <div className="font-semibold">{opp.coin}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        ${opp.signal.currentPrice.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{opp.signal.signal}</div>
                                                <div className="text-sm">
                                                    <Badge variant={opp.confidence >= 70 ? "default" : "secondary"}>
                                                        {opp.confidence}% confidence
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => analyzeCoin(opp.coin)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Analyze
                                            </Button>
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            {opp.recommendation}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Analyze Tab */}
                {activeTab === "analyze" && (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter coin symbol (e.g., BTCUSDT, ETHUSDT)"
                                value={selectedCoin}
                                onChange={(e) => setSelectedCoin(e.target.value.toUpperCase())}
                                onKeyPress={(e) => e.key === "Enter" && analyzeCoin(selectedCoin)}
                                className="flex-1"
                            />
                            <Button
                                onClick={() => analyzeCoin(selectedCoin)}
                                disabled={isLoading || !selectedCoin.trim()}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                ) : (
                                    <BarChart3 className="w-4 h-4"/>
                                )}
                            </Button>
                        </div>

                        {coinAnalysis && (
                            <div className="space-y-4">
                                <Card className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold">{coinAnalysis.coin}</h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                ${coinAnalysis.signal.currentPrice.toLocaleString()}
                                            </div>
                                            <Badge
                                                variant={coinAnalysis.signal.confidence >= 70 ? "default" : "secondary"}>
                                                {coinAnalysis.signal.confidence}% confidence
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Signal Info */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Trading Signal</h4>
                                            <div className="text-lg font-medium mb-2">{coinAnalysis.signal.signal}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {coinAnalysis.signal.suggestedAction}
                                            </div>
                                        </div>

                                        {/* CoinGlass Data */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Liquidation Data (1h)</h4>
                                            <div className="space-y-1 text-sm">
                                                <div>Total:
                                                    ${coinAnalysis.coinglassData.totalLiquidations1h.toLocaleString()}</div>
                                                <div>Long:
                                                    ${coinAnalysis.coinglassData.longLiquidations1h.toLocaleString()}</div>
                                                <div>Short:
                                                    ${coinAnalysis.coinglassData.shortLiquidations1h.toLocaleString()}</div>
                                                <div>Spike: <Badge
                                                    variant="outline">{coinAnalysis.coinglassData.liquidationSpike}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Analysis */}
                                    {coinAnalysis.aiAnalysis && (
                                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                            <h4 className="font-semibold mb-2">AI Analysis</h4>
                                            <div className="text-sm space-y-2">
                                                <div><strong>Valid
                                                    Signal:</strong> {coinAnalysis.aiAnalysis.signalValidation.isValid ? "✅ Yes" : "❌ No"}
                                                </div>
                                                <div>
                                                    <strong>Reasoning:</strong> {coinAnalysis.aiAnalysis.signalValidation.reasoning}
                                                </div>
                                                <div><strong>Risk Level:</strong> <Badge
                                                    variant="outline">{coinAnalysis.aiAnalysis.riskAssessment.level}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Recommendation */}
                                    <div className="mt-4 p-3 border rounded-lg">
                                        <h4 className="font-semibold mb-2">AI Recommendation</h4>
                                        <div className="text-sm">{coinAnalysis.aiRecommendation}</div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}