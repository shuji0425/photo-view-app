"use client";

import { useCallback } from "react";
import { uploadProfileImage } from "@/lib/api/profile/upload";
import toast from "react-hot-toast";

/**
 * アバター画像アップロード用
 * @returns url | null
 */
export const useAvatarUploaderMutation = () => {
  const uploadAvatar = useCallback(
    async (userId: number, blob: Blob | null): Promise<string | null> => {
      if (!blob) return null;

      try {
        const file = new File([blob], "avatar.web", { type: "image/webp" });
        const { url } = await uploadProfileImage(userId, file);
        return url;
      } catch {
        toast.error("画像アップロードに失敗しました");
        return null;
      }
    },
    []
  );

  return { uploadAvatar };
};
