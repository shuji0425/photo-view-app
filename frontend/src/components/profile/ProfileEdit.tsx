"use client";

import { useState } from "react";
import { useProfile } from "@/lib/swr/useProfile";
import { updateProfile } from "@/lib/api/profile";
import { ProfileParams } from "@/types/profile";
import { mutate } from "swr";
import ProfileForm from "./ProfileForm";
import toast from "react-hot-toast";

type ProfileEditProps = {
  userId: number;
};

/**
 * 編集用プロフィール
 */
export default function ProfileEdit({ userId }: ProfileEditProps) {
  const { profile, isLoading, isError } = useProfile(userId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (data: ProfileParams) => {
    try {
      setIsSubmitting(true);
      await updateProfile(userId, data);
      await mutate(`/profiles/${userId}`);
    } catch {
      toast.error("プロフィールの更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>読み込み中...</p>;
  if (isError || !profile) return <p>プロフィールが見つかりません</p>;

  return (
    <ProfileForm
      defaultValues={profile}
      onSubmit={handleUpdate}
      isSubmitting={isSubmitting}
      submitLabel="更新"
      userId={userId}
    />
  );
}
