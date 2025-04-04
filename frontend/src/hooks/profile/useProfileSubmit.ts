import { useState } from "react";
import { updateProfile } from "@/lib/api/profile";
import { mutate } from "swr";
import { ProfileParams } from "@/lib/schema/profileSchema";
import toast from "react-hot-toast";

/**
 * プロフィール更新の送信処理・状態管理を行う
 * @param userId ログインID
 * @returns object
 */
export const useProfileSubmit = (userId: number) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProfileParams) => {
    try {
      setIsSubmitting(true);
      await updateProfile(userId, data);
      await mutate(`/profiles/${userId}`);
      toast.success("プロフィールを更新しました");
    } catch {
      toast.error("プロフィールの更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, submitLabel: "更新" };
};
