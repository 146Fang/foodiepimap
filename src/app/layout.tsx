import type { Metadata } from "next";
import "./globals.css";
// 確保路徑正確
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
        {/* 強制傳入一個空函式來滿足類型檢查 */}
        <AppSearchProvider onSearch={(term: string) => { console.log(term); }}>
          {children}
        </AppSearchProvider>
      </body>
    </html>
  );
}