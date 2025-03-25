"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

/**
 * 管理者ダッシュボード画面
 * @returns JSX
 */
export default function AdminDashboardPage() {
  const { user, isLoading, logout } = useAuth();

  // ローディング中表示
  if (isLoading) {
    return <p className="text-center mt-10">読み込み中...</p>;
  }

  // ログイン済みの表示
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">
        ようこそ {user?.username} さん！
      </h1>
      <p className="mb-4 text-gary-600">
        あなたは {user?.role === "admin" ? "管理者" : "ユーザー"}{" "}
        としてログインしています。
      </p>

      {/* ボタン */}
      <div className="flex flex-col items-center">
        <LogoutButton onLogout={logout} />
        <Link href="/admin/settings">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            設定
          </button>
        </Link>
      </div>
    </div>
  );
}
