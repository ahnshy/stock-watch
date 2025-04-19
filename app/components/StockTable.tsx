"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PricePoint {
    date: string;
    price: number;
}

interface Stock {
    symbol: string;
    name: string;
    price: number;
    history: PricePoint[];
}

// 가격 추이를 보여주는 간단한 차트 컴포넌트
function StockTrendChart({ history }: { history: PricePoint[] }) {
    return (
        <ResponsiveContainer width={100} height={40}>
            <LineChart data={history}>
                <Line type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} dot={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip />
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
    return (
        <Table aria-label="Stock List">
            <TableHeader>
                <TableColumn>이름</TableColumn>
                <TableColumn>심볼</TableColumn>
                <TableColumn>시세</TableColumn>
                <TableColumn>추이</TableColumn>
                <TableColumn>즐겨찾기</TableColumn>
            </TableHeader>
            <TableBody>
                {stocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.symbol}</TableCell>
                        <TableCell>{stock.price.toLocaleString()}원</TableCell>
                        <TableCell>
                            {stock.history && stock.history.length > 0 ? (
                                <StockTrendChart history={stock.history} />
                            ) : (
                                <span className="text-sm text-gray-400">데이터 없음</span>
                            )}
                        </TableCell>
                        <TableCell>
                            {onToggleFavorite && (
                                <Button
                                    size="sm"
                                    onClick={() => onToggleFavorite(stock.symbol)}
                                    variant="flat"
                                    color={favorites?.includes(stock.symbol) ? "primary" : "default"}
                                >
                                    {favorites?.includes(stock.symbol) ? "★" : "☆"}
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
