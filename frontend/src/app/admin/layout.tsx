"use client";

export const metadata = createNoIndexMetadata();

import AdminSidebar from "@/components/layout/AdminSidebar";
import { createNoIndexMetadata } from "@/lib/utils/seo";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * 管理者用レイアウト
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/admin/login";

  if (!showSidebar) {
    // ログイン画面の中央寄せレイアウト
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4">
        <main className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          {children}
        </main>
      </div>
    );
  }

  // 通常管理画面レイアウト
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 h-screen sticky top-0 border-r bg-white shadow-sm z-10">
        <AdminSidebar />
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
