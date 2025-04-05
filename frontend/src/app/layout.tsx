import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "写真ポートフォリオサイト",
  description: "写真作品を一覧・詳細で公開するポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-hidden`}
      >
        {/* ヘッダー */}
        <Header />

        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
