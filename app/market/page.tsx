import StockList from "@/app/components/StockList";

export default function MarketPage() {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">전체 증시 목록</h1>
            <StockList />
        </div>
    );
}
