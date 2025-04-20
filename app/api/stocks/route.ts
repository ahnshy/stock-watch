// app/api/stocks/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FINNHUB_BASE = "https://finnhub.io/api/v1";

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.FINNHUB_API_KEY;
        if (!apiKey) {
            console.warn("FINNHUB_API_KEY is not set; returning mock data.");
            return NextResponse.json([]);
        }

        const { searchParams } = new URL(request.url);
        const query = searchParams.get("search")?.trim() || "";
        if (!query) {
            // 검색어가 없으면 빈 배열 반환
            return NextResponse.json([]);
        }

        const searchUrl = `${FINNHUB_BASE}/search?q=${encodeURIComponent(query)}&token=${apiKey}`;
        const searchRes = await fetch(searchUrl);
        const searchJson = await searchRes.json();
        const candidates: { symbol: string; description: string }[] = searchJson.result || [];

        const limited = candidates.slice(0, 10);
        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 24 * 60 * 60;

        const results = await Promise.all(
            limited.map(async ({ symbol, description }) => {
                const [quoteRes, candleRes] = await Promise.all([
                    fetch(`${FINNHUB_BASE}/quote?symbol=${symbol}&token=${apiKey}`),
                    fetch(
                        `${FINNHUB_BASE}/stock/candle?symbol=${symbol}&resolution=60&from=${oneDayAgo}&to=${now}&token=${apiKey}`
                    ),
                ]);
                const quote = await quoteRes.json();
                const candle = await candleRes.json();

                const history =
                    candle.t && candle.c
                        ? candle.t.map((t: number, i: number) => ({
                            date: new Date(t * 1000).toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                            price: candle.c[i],
                        }))
                        : [];

                return {
                    symbol,
                    name: description,
                    price: quote.c ?? 0,
                    history,
                };
            })
        );

        return NextResponse.json(results);
    } catch (err) {
        console.error("API Error : ", err);
        return NextResponse.json([]);
    }
}
