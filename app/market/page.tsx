// app/market/page.tsx
"use client";

import { useState, useEffect } from "react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function MarketPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then((data: Stock[]) => setStocks(data));
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">전체 증시 목록</h1>
            <StockTable stocks={stocks} />
        </div>
    );
}
