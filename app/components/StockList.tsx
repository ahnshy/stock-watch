"use client";

import { useEffect, useState } from "react";

export default function StockList({
                                      onToggleFavorite,
                                      favorites = [],
                                  }: {
    onToggleFavorite?: (symbol: string) => void;
    favorites?: string[];
}) {
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then(setStocks);
    }, []);

    return (
        <div className="space-y-4">
            {stocks.map((stock) => (
                <div
                    key={stock.symbol}
                    className="flex justify-between items-center border-b pb-2"
                >
                    <div>
                        <div className="font-bold">{stock.name}</div>
                        <div className="text-sm text-gray-500">{stock.symbol}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold">{stock.price.toLocaleString()}원</div>
                        {onToggleFavorite && (
                            <button
                                onClick={() => onToggleFavorite(stock.symbol)}
                                className="text-sm text-blue-500"
                            >
                                {favorites.includes(stock.symbol) ? "★" : "☆"}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
