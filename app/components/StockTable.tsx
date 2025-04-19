"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Stock {
    symbol: string;
    name: string;
    price: number;
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
                            <ResponsiveContainer width={100} height={30}>
                                <LineChart
                                    data={[1, 2, 3, 4, 5].map((i) => ({ x: i, y: stock.price - 1000 + i * 100 }))}
                                >
                                    <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
                                    <XAxis dataKey="x" hide />
                                    <YAxis hide domain={["auto", "auto"]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
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
