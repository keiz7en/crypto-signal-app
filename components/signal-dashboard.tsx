"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { SignalOutput } from "@/lib/types"
import { SignalTable } from "./signal-table"
import {AISearch} from "./ai-search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Loader2, RefreshCcw, Clock, TrendingUp, Bot} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ApiResponse {
    signals: SignalOutput[]
    metadata?: {
        totalProcessed: number
        highConfidenceCount: number
        processingTimeMs: number
        timestamp: string
        totalCoins?: number
        aiValidatedCount?: number
        aiAnalysisEnabled?: boolean
    }
}

export function SignalDashboard() {
  const [signals, setSignals] = useState<SignalOutput[]>([])
    const [metadata, setMetadata] = useState<ApiResponse['metadata'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("ALL")
  const { toast } = useToast()

  const fetchSignals = useCallback(async () => {
    setLoading(true)
      const startTime = Date.now()

      try {
      const response = await fetch("/api/signals")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

        const data: ApiResponse = await response.json()
        const endTime = Date.now()
        const totalTime = endTime - startTime

        // Handle both old and new response formats
        if (Array.isArray(data)) {
            // Old format - just array of signals
            setSignals(data)
            setMetadata(null)
            toast({
                title: "⚡ Signals Updated",
                description: `Fetched ${data.length} signals in ${(totalTime / 1000).toFixed(1)}s`,
            })
        } else {
            // New format with metadata
            setSignals(data.signals || [])
            setMetadata(data.metadata || null)
            toast({
                title: "🚀 AI-Enhanced Signals Updated",
                description: data.metadata
                    ? `Loaded ${data.signals?.length} signals in ${(totalTime / 1000).toFixed(1)}s (${data.metadata.aiValidatedCount || 0} AI-validated)`
                    : `Fetched ${data.signals?.length} signals in ${(totalTime / 1000).toFixed(1)}s`,
            })
        }
    } catch (error) {
      console.error("Failed to fetch signals:", error)
      toast({
        title: "Error",
        description: "Failed to fetch signals. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchSignals()
      const interval = setInterval(fetchSignals, 120000) // Refresh every 2 minutes for AI analysis
    return () => clearInterval(interval)
  }, [fetchSignals])

  const filteredSignals = useMemo(() => {
    let currentSignals = signals

    if (filterType !== "ALL") {
      currentSignals = currentSignals.filter((signal) => signal.signal.includes(filterType))
    }

    if (searchTerm) {
      currentSignals = currentSignals.filter((signal) => signal.coin.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return currentSignals
  }, [signals, searchTerm, filterType])

  const signalTypes = [
    "ALL",
    "REVERSAL STARTED - LONG",
      "REVERSAL STARTED - SHORT",
      "LONG GOING",
    "SHORT GOING",
    "LONG RISKY TODAY",
    "SHORT RISKY TODAY",
    "NO SIGNAL (STAY AWAY)",
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold">AI-Powered Crypto Signals</h1>
              {metadata && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4"/>
                          {(metadata.processingTimeMs / 1000).toFixed(1)}s
                      </div>
                      <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4"/>
                          {metadata.highConfidenceCount}/{metadata.totalProcessed} high-confidence
                      </div>
                      {metadata.aiValidatedCount !== undefined && (
                          <div className="flex items-center gap-1">
                              <Bot className="h-4 w-4"/>
                              {metadata.aiValidatedCount} AI-validated
                          </div>
              )}
                <div className="text-xs">
                    Processed: {metadata.totalProcessed}/{metadata.totalCoins || metadata.totalProcessed} coins
                </div>
                <div className="text-xs">
                    Updated: {new Date(metadata.timestamp).toLocaleTimeString()}
                </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button onClick={fetchSignals} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
              {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>

        <Tabs defaultValue="signals" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signals">Trading Signals</TabsTrigger>
                <TabsTrigger value="ai-search">AI Assistant</TabsTrigger>
            </TabsList>

            <TabsContent value="signals" className="space-y-4">
                <div className="flex gap-2 w-full">
                    <Input
                        placeholder="Search coin..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Signal"/>
                        </SelectTrigger>
                        <SelectContent>
                            {signalTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {loading && signals.length === 0 ? (
                    <div className="text-center py-10">
                        <Loader2 className="h-10 w-10 animate-spin text-gray-500 mx-auto mb-4"/>
                        <p className="text-lg text-muted-foreground">🤖 AI is analyzing crypto signals...</p>
                        <p className="text-sm text-muted-foreground mt-2">Processing Binance data, news sentiment &
                            liquidation patterns</p>
                    </div>
                ) : (
                    <>
              {filteredSignals.length === 0 ? (
                  <div className="text-center py-10">
                      <p className="text-lg text-muted-foreground">No signals match your criteria</p>
                      <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter</p>
                  </div>
              ) : (
                  <SignalTable signals={filteredSignals}/>
              )}
            </>
          )}
        </TabsContent>

          <TabsContent value="ai-search">
              <AISearch/>
          </TabsContent>
      </Tabs>
    </div>
  )
}
