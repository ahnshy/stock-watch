// app/components/StockList.tsx
import React from "react";
import type { Stock } from "./StockTable";

interface StockListProps {
    stocks: Stock[];
    favorites: string[];
    onToggleFavorite: (symbol: string) => void;
}

export default function StockList({
                                      stocks,
                                      favorites,
                                      onToggleFavorite,
                                  }: StockListProps) {
    return (
        <ul>
            {stocks.map((stock: Stock) => (
                <li key={stock.symbol} className="flex items-center space-x-2 py-2">
                    <button
                        onClick={() => onToggleFavorite(stock.symbol)}
                        aria-label={
                            favorites.includes(stock.symbol)
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        {favorites.includes(stock.symbol) ? "★" : "☆"}
                    </button>
                    <span className="flex-1">
            {stock.name}{" "}
                        <span className="font-mono text-gray-500 text-sm">
              ({stock.symbol})
            </span>
          </span>
                    <span className="font-semibold">
            {stock.price > 0 ? `${stock.price.toLocaleString()}원` : "–"}
          </span>
                </li>
            ))}
        </ul>
    );
}
