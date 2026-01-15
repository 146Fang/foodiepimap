import type { Metadata } from "next";
import "./globals.css";
// 導入你的 Search Provider
import { AppSearchProvider } from "@/contexts/AppSearch";

export const metadata: Metadata = {
  title: "FoodiePi Map",
  description: "Web3 App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {/* 必須用 Provider 包裹 children，Header 才能找到 Context */}
        <AppSearchProvider>
          {children}
        </AppSearchProvider>
      </body>
    </html>
  );
}