// app/api/stocks/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("search")?.trim();
    if (!keyword) return NextResponse.json([]);

    const urls = [
        "https://m.stock.naver.com/api/json/sise/siseListJson.nhn?menu=market_sum&sosok=0&pageSize=1000&page=1",
        "https://m.stock.naver.com/api/json/sise/siseListJson.nhn?menu=market_sum&sosok=1&pageSize=1000&page=1",
    ];

    const [resKpi, resKdq] = await Promise.all(urls.map((u) => fetch(u)));
    const [rawKpi, rawKdq] = await Promise.all([resKpi.json(), resKdq.json()]);

    // rawKpi/result 객체 안에 itemList 배열이 있는 경우 꺼내고, 그렇지 않으면 rawKpi 자체가 배열이라고 간주
    const listKpi = Array.isArray(rawKpi)
        ? rawKpi
        : (rawKpi as any).result?.itemList ?? [];
    const listKdq = Array.isArray(rawKdq)
        ? rawKdq
        : (rawKdq as any).result?.itemList ?? [];

    const suggestions = [...listKpi, ...listKdq]
        .filter((item: any) => item.nm.includes(keyword) || item.cd.includes(keyword))
        .slice(0, 5)
        .map((item: any) => ({
            symbol: item.cd,
            name: item.nm,
            price: item.nv,
            history: [] as { time: string; price: number }[],
        }));

    return NextResponse.json(suggestions);
}
