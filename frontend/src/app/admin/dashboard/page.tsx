"use client";

import { useAuth } from "@/hooks/useAuth";

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
      <p className="mb-8 text-gary-600">
        あなたは {user?.role === "admin" ? "管理者" : "ユーザー"}{" "}
        としてログインしています。
      </p>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        ログアウト
      </button>
    </div>
  );
}
