import {NextRequest, NextResponse} from "next/server"
import {searchCryptoInfo} from "@/lib/ai-analysis"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        const {query} = await request.json()

        if (!query || typeof query !== 'string') {
            return NextResponse.json({
                error: "Query is required"
            }, {status: 400})
        }

        console.log(`🔍 AI Search query: "${query}"`)

        const result = await searchCryptoInfo(query)

        return NextResponse.json({
            query,
            response: result,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error("AI Search error:", error)
        return NextResponse.json({
            error: "AI search failed",
            message: "Please try again later"
        }, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
        return NextResponse.json({
            error: "Query parameter 'q' is required"
        }, {status: 400})
    }

    try {
        console.log(`🔍 AI Search query: "${query}"`)

        const result = await searchCryptoInfo(query)

        return NextResponse.json({
            query,
            response: result,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error("AI Search error:", error)
        return NextResponse.json({
            error: "AI search failed",
            message: "Please try again later"
        }, {status: 500})
    }
}