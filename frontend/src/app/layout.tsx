import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Portfolio",
  description: "モバイルファーストの写真ポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}
