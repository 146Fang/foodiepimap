import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 換成穩定的 Inter 字體
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodiePi Map - 食尚派地圖",
  description: "Web3 餐廳搜尋與獎勵平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}