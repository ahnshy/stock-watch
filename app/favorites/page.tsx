// app/favorites/page.tsx
"use client";

import { useState, useEffect } from "react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function FavoritesPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("/api/stocks")
            .then(res => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setStocks(data);
                } else if (Array.isArray((data as any).stocks)) {
                    setStocks((data as any).stocks);
                } else {
                    console.error("Unexpected /api/stocks response:", data);
                    setStocks([]);
                }
            });

        const saved = localStorage.getItem("favorites");
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const toggleFavorite = (symbol: string) => {
        const next = favorites.includes(symbol)
            ? favorites.filter(s => s !== symbol)
            : [...favorites, symbol];
        setFavorites(next);
        localStorage.setItem("favorites", JSON.stringify(next));
    };

    const filtered = stocks
        .filter(s => favorites.includes(s.symbol))
        .filter(
            s =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">자주 찾는 종목</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="종목명 또는 심볼 검색"
                className="w-full border rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <StockTable
                stocks={filtered}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        </div>
    );
}
