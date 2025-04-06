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
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">
        ようこそ {user?.username} さん！
      </h1>
      <p className="mb-4 text-center text-gray-600">
        あなたは {user?.role === "admin" ? "管理者" : "ユーザー"}{" "}
        としてログインしています。
      </p>

      {/* ボタン */}
      <div className="flex flex-col items-center gap-4">
        {/* ログアウト */}
        <LogoutButton onLogout={logout} />

        {/* プロフィール */}
        {!profile && (
          <NavButton
            href="/admin/profile"
            label="プロフィール作成"
            color="yellow"
          />
        )}
      </div>
    </>
  );
}
