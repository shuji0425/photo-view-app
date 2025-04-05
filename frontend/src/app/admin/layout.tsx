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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
        <main className="p-6 w-full max-w-screen-md">
          <div className="bg-white p-6 shadow-md rounded-xl">{children}</div>
        </main>
      </div>
    );
  }

  // 通常管理画面レイアウト
  return (
    <div className="h-screen grid grid-cols-12 bg-gray-50 text-gray-900 overflow-y-auto">
      <aside className="col-span-3 border-r">
        <AdminSidebar />
      </aside>
      <main className="col-span-9 p-6 mb-10 max-h-full">{children}</main>
    </div>
  );
}
