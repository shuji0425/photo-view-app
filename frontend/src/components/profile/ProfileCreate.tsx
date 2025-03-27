"use client";

import { useState } from "react";
import { createProfile } from "@/lib/api/profile";
import { ProfileParams } from "@/types/profile";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { mutate } from "swr";

type ProfileCreateProps = {
  userId: number;
};

/**
 * プロフィール作成コンポーネント
 * @param userId ユーザーID
 * @returns JSX.Element
 */
export default function ProfileCreate({ userId }: ProfileCreateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreate = async (data: ProfileParams) => {
    try {
      setIsSubmitting(true);
      await createProfile(userId, data);
      await mutate(`/profiles/${userId}`);
      router.push("/admin/dashboard");
    } catch {
      alert("プロフィールの作成に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileForm
      onSubmit={handleCreate}
      isSubmitting={isSubmitting}
      submitLabel="作成"
      userId={userId}
    />
  );
}
