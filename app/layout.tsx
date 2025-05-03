// app/layout.tsx
//import { NextUIProvider } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
