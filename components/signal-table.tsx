import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button"
import type { SignalOutput } from "@/lib/types"
import {
    ArrowUp,
    ArrowDown,
    RefreshCw,
    AlertTriangle,
    CircleDot,
    Bot,
    ChevronDown,
    CheckCircle,
    XCircle,
    TrendingUp,
    Shield
} from "lucide-react"
import {useState} from "react"

interface SignalTableProps {
  signals: SignalOutput[]
}

export function SignalTable({ signals }: SignalTableProps) {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

    const toggleRowExpansion = (coin: string) => {
        const newExpanded = new Set(expandedRows)
        if (newExpanded.has(coin)) {
            newExpanded.delete(coin)
        } else {
            newExpanded.add(coin)
        }
        setExpandedRows(newExpanded)
    }

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

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'LOW':
                return 'text-green-600 bg-green-50'
            case 'MEDIUM':
                return 'text-yellow-600 bg-yellow-50'
            case 'HIGH':
                return 'text-red-600 bg-red-50'
            case 'EXTREME':
                return 'text-red-800 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-50'
        }
    }

    return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
              <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[120px]">Coin</TableHead>
            <TableHead className="w-[150px]">Current Price</TableHead>
            <TableHead className="w-[200px]">Signal</TableHead>
            <TableHead className="w-[100px]">Confidence</TableHead>
              <TableHead className="w-[80px]">AI Status</TableHead>
            <TableHead>Trend Summary</TableHead>
            <TableHead>Suggested Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signals.length === 0 ? (
            <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                No signals found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            signals.map((signal) => (
                <React.Fragment key={signal.coin}>
                    <TableRow className="hover:bg-muted/50">
                        <TableCell>
                            {signal.aiAnalysis && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleRowExpansion(signal.coin)}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            expandedRows.has(signal.coin) ? 'rotate-180' : ''
                                        }`}
                                    />
                                </Button>
                            )}
                        </TableCell>
                        <TableCell className="font-medium">{signal.coin}</TableCell>
                        <TableCell>${signal.currentPrice.toLocaleString()}</TableCell>
                        <TableCell>
                            <Badge className={getSignalColor(signal.signal)}>
                                {getSignalIcon(signal.signal)}
                                <span className="ml-1">{signal.signal}</span>
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <span>{signal.confidence}%</span>
                                {signal.aiAnalysis?.signalValidation.isValid && (
                                    <CheckCircle className="h-3 w-3 text-green-500"/>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            {signal.aiAnalysis ? (
                                <div className="flex items-center gap-1">
                                    <Bot className="h-4 w-4 text-blue-500"/>
                                    {signal.aiAnalysis.signalValidation.isValid ? (
                                        <CheckCircle className="h-3 w-3 text-green-500"/>
                                    ) : (
                                        <XCircle className="h-3 w-3 text-red-500"/>
                                    )}
                                </div>
                            ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <ul className="list-disc pl-4 text-sm">
                                {signal.trendSummary.slice(0, 2).map((summary, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{__html: summary}}/>
                                ))}
                                {signal.trendSummary.length > 2 && (
                                    <li className="text-muted-foreground">
                                        +{signal.trendSummary.length - 2} more...
                                    </li>
                                )}
                            </ul>
                        </TableCell>
                        <TableCell dangerouslySetInnerHTML={{__html: signal.suggestedAction}}/>
                    </TableRow>

                    {/* AI Analysis Expansion */}
                    {signal.aiAnalysis && expandedRows.has(signal.coin) && (
                        <TableRow className="bg-blue-50/50 dark:bg-blue-950/10">
                            <TableCell colSpan={8} className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Bot className="h-4 w-4 text-blue-500"/>
                                        AI Analysis for {signal.coin}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {/* Signal Validation */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                {signal.aiAnalysis.signalValidation.isValid ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500"/>
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-500"/>
                                                )}
                                                <span className="text-sm font-medium">Signal Validation</span>
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <p>
                                                    <strong>Valid:</strong> {signal.aiAnalysis.signalValidation.isValid ? 'Yes' : 'No'}
                                                </p>
                                                <p><strong>AI
                                                    Confidence:</strong> {signal.aiAnalysis.signalValidation.confidence}%
                                                </p>
                                                <p className="text-muted-foreground">{signal.aiAnalysis.signalValidation.reasoning}</p>
                                            </div>
                                        </div>

                                        {/* Risk Assessment */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-yellow-500"/>
                                                <span className="text-sm font-medium">Risk Assessment</span>
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <Badge className={getRiskColor(signal.aiAnalysis.riskAssessment.level)}>
                                                    {signal.aiAnalysis.riskAssessment.level} Risk
                                                </Badge>
                                                {signal.aiAnalysis.riskAssessment.factors.length > 0 && (
                                                    <div>
                                                        <p className="font-medium">Risk Factors:</p>
                                                        <ul className="list-disc pl-3">
                                                            {signal.aiAnalysis.riskAssessment.factors.map((factor, idx) => (
                                                                <li key={idx}
                                                                    className="text-muted-foreground">{factor}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {signal.aiAnalysis.riskAssessment.warnings.length > 0 && (
                                                    <div>
                                                        <p className="font-medium text-red-600">Warnings:</p>
                                                        <ul className="list-disc pl-3">
                                                            {signal.aiAnalysis.riskAssessment.warnings.map((warning, idx) => (
                                                                <li key={idx} className="text-red-600">{warning}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* News Analysis */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-green-500"/>
                                                <span className="text-sm font-medium">News Sentiment</span>
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <Badge variant={
                                                    signal.aiAnalysis.newsAnalysis.overallSentiment === 'BULLISH' ? 'default' :
                                                        signal.aiAnalysis.newsAnalysis.overallSentiment === 'BEARISH' ? 'destructive' : 'secondary'
                                                }>
                                                    {signal.aiAnalysis.newsAnalysis.overallSentiment}
                                                </Badge>
                                                <p className="text-muted-foreground">{signal.aiAnalysis.newsAnalysis.marketContext}</p>
                                                {signal.aiAnalysis.newsAnalysis.keyNews.length > 0 && (
                                                    <div>
                                                        <p className="font-medium">Recent News:</p>
                                                        <ul className="space-y-1">
                                                            {signal.aiAnalysis.newsAnalysis.keyNews.slice(0, 2).map((news, idx) => (
                                                                <li key={idx} className="text-muted-foreground">
                                                                    • {news.title}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Suggested Action */}
                                    <div
                                        className="bg-white dark:bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500">
                                        <p className="text-sm font-medium">AI Recommendation:</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {signal.aiAnalysis.signalValidation.suggestedAction}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
