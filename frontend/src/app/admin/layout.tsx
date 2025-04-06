"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
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
      <div className="flex items-center justify-center h-full w-full text-gray-900">
        <main className="p-6 w-full max-w-screen-md">
          <div className="bg-white p-6 shadow-md rounded-xl">{children}</div>
        </main>
      </div>
    );
  }

  // 通常管理画面レイアウト
  return (
    <div className="flex w-full text-gray-900 min-h-[calc(100vh-48px)]">
      <aside className="w-64 border-r">
        <AdminSidebar />
      </aside>
      <main className="h-full p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
