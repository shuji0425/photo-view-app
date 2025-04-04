import { useState } from "react";
import { createProfile } from "@/lib/api/profile";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { ProfileParams } from "@/lib/schema/profileSchema";
import toast from "react-hot-toast";

/**
 * プロフィール作成処理・状態管理を行う
 * @param userId ログインID
 * @returns object
 */
export const useProfileCreate = (userId: number) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: ProfileParams) => {
    try {
      setIsSubmitting(true);
      await createProfile(userId, data);
      await mutate(`/profiles/${userId}`);
      toast.success("プロフィールを作成しました");
      router.push("/admin/dashboard");
    } catch {
      toast.error("プロフィールの登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, submitLabel: "作成" };
};
