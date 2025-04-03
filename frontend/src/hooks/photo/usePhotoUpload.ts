import { useState } from "react";
import { postUploadImages } from "@/lib/api/photo/upload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

/**
 * 画像アップロード処理
 * @param userId ユーザーID
 * @returns object
 */
export const usePhotoUpload = (userId: number) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // アップロード処理
  const upload = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setProgress(0);

    // フォーム作成
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const uploadedIds = await postUploadImages(userId, formData, setProgress);
      if (uploadedIds && uploadedIds.length > 0) {
        toast.success("アップロードが完了しました");
        router.push(`/admin/photos/edit?ids=${uploadedIds.join(",")}`);
      }
    } catch {
      toast.error("画像アップロードに失敗しました");
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, progress };
};
