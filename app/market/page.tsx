// app/market/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function MarketPage() {
    const { data: session } = useSession();
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Stock[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            return;
        }
        fetch(`/api/stocks?search=${encodeURIComponent(searchTerm)}`)
            .then((r) => r.json())
            .then((data: Stock[]) => setSuggestions(data.slice(0, 5)))
            .catch(() => setSuggestions([]));
    }, [searchTerm]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = async (stock: Stock) => {
        setSearchTerm(stock.symbol);
        setSuggestions([]);

        const res = await fetch(`/api/stock-quote?symbol=${stock.symbol}`);
        const { price } = await res.json();
        setStocks([{ ...stock, price }]);
    };

    const toggleFavorite = (symbol: string) => {
        setFavorites((prev) =>
            prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">전체 증시 목록</h1>

            <div className="relative mb-4" ref={wrapperRef}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="종목명 또는 심볼 검색"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto dark:bg-gray-800 dark:text-white">
                        {suggestions.map((s) => (
                            <li
                                key={s.symbol}
                                onClick={() => handleSelect(s)}
                                className="
                  cursor-pointer px-3 py-2
                  transition-colors duration-150
                  hover:bg-[#2DB400] hover:text-white
                  dark:hover:bg-[#2DB400] dark:hover:text-white
                "
                                style={{ backgroundClip: "padding-box" }}
                            >
                                {s.name}{" "}
                                <span className="font-mono text-gray-500 text-sm">
                  ({s.symbol})
                </span>{" "}
                                —{" "}
                                <span className="font-semibold">
                  {s.price.toLocaleString()}원
                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <StockTable
                stocks={stocks}
                favorites={session ? favorites : undefined}
                onToggleFavorite={session ? toggleFavorite : undefined}
            />
        </div>
    );
}
