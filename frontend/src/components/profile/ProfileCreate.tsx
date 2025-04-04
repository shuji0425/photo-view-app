"use client";

import ProfileForm from "./ProfileForm";
import { useProfileCreate } from "@/hooks/profile/useProfileCreate";

type ProfileCreateProps = {
  userId: number;
};

/**
 * プロフィール作成コンポーネント
 * @param userId ユーザーID
 * @returns JSX.Element
 */
export default function ProfileCreate({ userId }: ProfileCreateProps) {
  const { handleSubmit, isSubmitting, submitLabel } = useProfileCreate(userId);

  return (
    <ProfileForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={submitLabel}
      userId={userId}
    />
  );
}
