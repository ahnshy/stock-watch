// app/market/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import StockTable, { Stock } from "@/app/components/StockTable";

export default function MarketPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<Stock[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const q = searchTerm.trim();
            if (!q) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await fetch(`/api/stocks?search=${encodeURIComponent(q)}`);
                const data: Stock[] = await res.json();
                setSuggestions(data.slice(0, 5)); // 상위 5개만 표시
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            }
        };
        fetchSuggestions();
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelect = (stock: Stock) => {
        setSearchTerm(stock.symbol);
        setSuggestions([]);
        setStocks([stock]);
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
                    onChange={handleInputChange}
                    placeholder="종목명 또는 심볼 검색"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto dark:bg-gray-800 dark:text-white">
                        {suggestions.map((s) => (
                            <li
                                key={s.symbol}
                                onClick={() => handleSelect(s)}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        </div>
    );
}
