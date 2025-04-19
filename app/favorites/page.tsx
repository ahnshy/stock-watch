// app/favorites/page.tsx
"use client";

import { useState, useEffect } from "react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function FavoritesPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        // 전체 종목 로드
        fetch("/api/stocks")
            .then((res) => res.json())
            .then((data: Stock[]) => setStocks(data));

        // 로컬스토리지에서 즐겨찾기 불러오기
        const saved = localStorage.getItem("favorites");
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const toggleFavorite = (symbol: string) => {
        const newFav = favorites.includes(symbol)
            ? favorites.filter((s) => s !== symbol)
            : [...favorites, symbol];
        setFavorites(newFav);
        localStorage.setItem("favorites", JSON.stringify(newFav));
    };

    // 즐겨찾기된 종목만 필터링
    const filtered = stocks.filter((s) => favorites.includes(s.symbol));

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">자주 찾는 종목</h1>
            <StockTable
                stocks={filtered}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        </div>
    );
}
