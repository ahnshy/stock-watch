"use client";

import { useEffect, useState } from "react";
import StockList from "@/app/components/StockList";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
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

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">자주 찾는 종목</h1>
            <StockList favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
}
