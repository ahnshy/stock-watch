// app/favorites/page.tsx
"use client";

import { useState, useEffect } from "react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) {
            setFavorites(JSON.parse(saved) as string[]);
        }
    }, []);

    useEffect(() => {
        if (favorites.length === 0) {
            setStocks([]);
            return;
        }

        const fetchFavorites = async () => {
            const all: Stock[][] = await Promise.all(
                favorites.map((symbol: string) =>
                    fetch(`/api/stocks?search=${encodeURIComponent(symbol)}`)
                        .then((res) => res.json() as Promise<Stock[]>)
                )
            );
            setStocks(all.flat());
        };

        fetchFavorites();
    }, [favorites]);

    const toggleFavorite = (symbol: string) => {
        setFavorites((prev) => {
            const next = prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol];
            localStorage.setItem("favorites", JSON.stringify(next));
            return next;
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">즐겨찾기</h1>
            <StockTable
                stocks={stocks}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        </div>
    );
}
