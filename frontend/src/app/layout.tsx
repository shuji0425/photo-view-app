import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SITE_NAME } from "@/lib/constants/metadata";
import Script from "next/script";
import ToasterClient from "@/components/ui/ToasterClient";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: SITE_NAME,
  description: "写真のためにフレームをWEBサイト上に作りました。",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#27272A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GT5R8G8Q2P"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              requestIdleCallback(() => {
                gtag('js', new Date());
                gtag('config', 'G-GT5R8G8Q2P', { anonymize_ip: true });
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        {children}
        <ToasterClient />
      </body>
    </html>
  );
}
