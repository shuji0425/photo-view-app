"use client";

import { useProfile } from "@/lib/swr/useProfile";
import ProfileForm from "./ProfileForm";
import { useProfileSubmit } from "@/hooks/profile/useProfileSubmit";

type Props = { userId: number };

/**
 * 編集用プロフィール
 */
export default function ProfileEdit({ userId }: Props) {
  const { profile, isLoading, isError } = useProfile(userId);
  const { handleSubmit, isSubmitting, submitLabel } = useProfileSubmit(userId);

  if (isLoading) return <p>読み込み中...</p>;
  if (isError || !profile) return <p>プロフィールが見つかりません</p>;

  return (
    <ProfileForm
      defaultValues={profile}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
      userId={userId}
    />
  );
}
