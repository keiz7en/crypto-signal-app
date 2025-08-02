import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SignalOutput } from "@/lib/types"
import { ArrowUp, ArrowDown, RefreshCw, AlertTriangle, CircleDot } from "lucide-react"

interface SignalCardProps {
  signal: SignalOutput
}

export function SignalCard({ signal }: SignalCardProps) {
  const getSignalColor = (signalType: SignalOutput["signal"]) => {
    if (signalType.includes("LONG")) return "bg-green-500 text-white"
    if (signalType.includes("SHORT")) return "bg-red-500 text-white"
    if (signalType.includes("RISKY")) return "bg-yellow-500 text-black"
    return "bg-gray-200 text-gray-800"
  }

  const getSignalIcon = (signalType: SignalOutput["signal"]) => {
    if (signalType.includes("REVERSAL STARTED - LONG")) return <RefreshCw className="h-4 w-4 rotate-90" />
    if (signalType.includes("REVERSAL STARTED - SHORT")) return <RefreshCw className="h-4 w-4 -rotate-90" />
    if (signalType.includes("LONG GOING")) return <ArrowUp className="h-4 w-4" />
    if (signalType.includes("SHORT GOING")) return <ArrowDown className="h-4 w-4" />
    if (signalType.includes("RISKY")) return <AlertTriangle className="h-4 w-4" />
    return <CircleDot className="h-4 w-4" />
  }

  return (
    <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{signal.coin}</CardTitle>
        <Badge className={getSignalColor(signal.signal)}>
          {getSignalIcon(signal.signal)}
          <span className="ml-1">{signal.signal}</span>
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold mb-2">${signal.currentPrice.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground mb-4">
          Confidence: <span className="font-semibold">{signal.confidence}%</span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Trend Summary:</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            {signal.trendSummary.map((summary, index) => (
              <li key={index}>{summary}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Suggested Action:</h3>
          <p className="text-sm text-muted-foreground">{signal.suggestedAction}</p>
        </div>
      </CardContent>
    </Card>
  )
}
