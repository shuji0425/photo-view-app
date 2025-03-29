import AdminSidebar from "@/components/layout/AdminSidebar";
import React from "react";

/**
 * 管理者用レイアウト
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-50 text-gray-900">
      <aside className="col-span-3 bg-gray-100 p-4 border-r">
        <AdminSidebar />
      </aside>
      <main className="col-span-9 p-6 overflow-y-auto flex justify-center items-start">
        <div className="bg-white p-6 shadow-md rounded-xl w-full max-w-screen-md">
          {children}
        </div>
      </main>
    </div>
  );
}
