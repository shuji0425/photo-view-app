"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/lib/swr/useProfile";
import ProfileCreate from "@/components/profile/ProfileCreate";
import ProfileEdit from "@/components/profile/ProfileEdit";
import { NavButton } from "@/components/ui/NavButton";

/**
 * 管理者用プロフィールページ
 */
export default function AdminProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const userId = Number(user?.id ?? 0);
  const { profile, isLoading: profileLoading } = useProfile(userId);

  if (authLoading || profileLoading) return <p>読み込み中...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>
      {profile ? (
        <ProfileEdit userId={userId} />
      ) : (
        <ProfileCreate userId={userId} />
      )}

      {/* 戻るボタン */}
      <div className="mt-6">
        <NavButton href="/admin/dashboard" label="戻る" color="blue" />
      </div>
    </>
  );
}
