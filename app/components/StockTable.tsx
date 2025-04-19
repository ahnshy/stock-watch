"use client";

import { useEffect, useState } from "react";
import StockTable from "@/app/components/StockTable";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) setFavorites(JSON.parse(saved));

        fetch("/api/stocks")
            .then((res) => res.json())
            .then(setStocks);
    }, []);

    const toggleFavorite = (symbol: string) => {
        const newFav = favorites.includes(symbol)
            ? favorites.filter((s) => s !== symbol)
            : [...favorites, symbol];
        setFavorites(newFav);
        localStorage.setItem("favorites", JSON.stringify(newFav));
    };

    const filtered = stocks.filter((s) => favorites.includes(s.symbol));

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">자주 찾는 종목</h1>
            <StockTable stocks={filtered} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
}
