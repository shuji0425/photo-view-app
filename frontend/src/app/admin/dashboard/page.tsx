"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/lib/swr/useProfile";
import { NavButton } from "@/components/ui/NavButton";

/**
 * 管理者ダッシュボード画面
 * @returns JSX
 */
export default function AdminDashboardPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const userId = Number(user?.id ?? 0);
  const { profile, isLoading: profileLoading } = useProfile(userId);

  // ローディング中表示
  if (authLoading || profileLoading) {
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
        {/* ログアウト */}
        <LogoutButton onLogout={logout} />

        {/* プロフィール */}
        <NavButton
          href="/admin/profile"
          label={profile ? "プロフィール編集" : "プロフィール作成"}
          color={profile ? "green" : "yellow"}
        />
      </div>
    </div>
  );
}
