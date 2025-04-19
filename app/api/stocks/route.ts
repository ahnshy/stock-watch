import { NextResponse } from "next/server";

const stocks = [
    { symbol: "005930.KQ", name: "삼성전자", price: 78500, history: [
            { date: "09:30", price: 78000 },
            { date: "10:00", price: 78500 },
            { date: "10:30", price: 79000 },
            // ...
        ], },
    { symbol: "000660.KQ", name: "SK하이닉스", price: 134000 },
    { symbol: "035420.KQ", name: "NAVER", price: 212000 },
];


export async function GET() {
    return NextResponse.json(stocks);
}
