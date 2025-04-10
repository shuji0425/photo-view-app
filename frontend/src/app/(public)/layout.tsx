import React from "react";
import Header from "@/components/layout/Header";

type Props = {
  children: React.ReactNode;
};

/**
 * 公開レイアウト
 */
export default function PublicLayout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col bg-zinc-800 text-white">
      {/* ヘッダー */}
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
