// app/components/StockTable.tsx
"use client";

import { Button } from "@nextui-org/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export interface PricePoint {
    time: string;
    price: number;
}

export interface Stock {
    symbol: string;
    name: string;
    price: number;
    history?: PricePoint[];
}

function StockTrendChart({ history }: { history: PricePoint[] }) {
    return (
        <ResponsiveContainer width="100%" height={40}>
            <LineChart data={history}>
                <XAxis dataKey="time" hide />
                <YAxis domain={["auto", "auto"]} hide />
                <Tooltip />
                <Line type="monotone" dataKey="price" dot={false} stroke="#3b82f6" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default function StockTable({
                                       stocks,
                                       favorites,
                                       onToggleFavorite,
                                   }: {
    stocks: Stock[];
    favorites?: string[];
    onToggleFavorite?: (symbol: string) => void;
}) {
    const showFav = Boolean(onToggleFavorite);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                        이름
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                        심볼
                    </th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                        시세
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                        추이
                    </th>
                    {showFav && (
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                            즐겨찾기
                        </th>
                    )}
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                            {stock.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                            {stock.symbol}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100 text-right">
                            {stock.price.toLocaleString()}원
                        </td>
                        <td className="px-4 py-2 text-center">
                            {stock.history && stock.history.length > 0 ? (
                                <StockTrendChart history={stock.history} />
                            ) : (
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                    데이터 없음
                  </span>
                            )}
                        </td>
                        {showFav && (
                            <td className="px-4 py-2 text-center">
                                <Button
                                    size="sm"
                                    variant="flat"
                                    color={
                                        favorites?.includes(stock.symbol)
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => onToggleFavorite!(stock.symbol)}
                                >
                                    {favorites?.includes(stock.symbol) ? "★" : "☆"}
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
