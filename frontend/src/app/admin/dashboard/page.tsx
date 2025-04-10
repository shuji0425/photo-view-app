"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/lib/swr/useProfile";
import { NavButton } from "@/components/ui/NavButton";
import AdminMainWrapper from "@/components/layout/AdminMainWrapper";

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
    <AdminMainWrapper>
      <h1 className="max-w-3xl">ようこそ {user?.username} さん！</h1>
      <p className="text-gray-600 text-base mb-6">
        あなたは
        <span className="font-semibold">
          {user?.role === "admin" ? "管理者" : "ユーザー"}
        </span>
        としてログインしています。
      </p>

      {/* ボタン */}
      <div className="space-y-3">
        {/* ログアウト */}
        <div>
          <LogoutButton onLogout={logout} />
        </div>

        {/* プロフィール */}
        {!profile && (
          <div>
            <NavButton
              href="/admin/profile"
              label="プロフィール作成"
              color="yellow"
            />
          </div>
        )}

        {/* アカウント情報変更 */}
        <div className="grid sm:grid-cols-3 gap-3">
          <NavButton
            href="/admin/settings/basic"
            label="アカウント情報変更"
            color="blue"
          />

          {/* パスワード変更 */}
          <NavButton
            href="/admin/settings/password"
            label="パスワード変更"
            color="blue"
          />

          {/* 表示ポリシー変更 */}
          <NavButton
            href="/admin/settings/metadata-policy"
            label="表示ポリシー変更"
            color="blue"
          />
        </div>
      </div>
    </AdminMainWrapper>
  );
}
