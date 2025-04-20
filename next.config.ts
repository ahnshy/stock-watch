import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
    },
};

export default nextConfig;
