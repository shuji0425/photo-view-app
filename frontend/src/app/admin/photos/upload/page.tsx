"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postUploadImages } from "@/lib/api/photo/upload";
import { ActionButton } from "@/components/ui/ActionButton";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { ImageDropzone } from "@/components/ui/ImageDropzone";

/**
 * 画像アップロード画面
 * @returns 遷移とid配列
 */
export default function PhotoUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const userId = Number(user?.id ?? 0);

  // ファイルをアップロード
  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      const uploadedIds = await postUploadImages(userId, formData);
      setFiles([]);
      setPreviews([]);
      // 成功したら遷移
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

  if (authLoading) return <p>読み込み中...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">画像アップロード</h1>

      <ImageDropzone
        files={files}
        previews={previews}
        setFiles={setFiles}
        setPreviews={setPreviews}
      />

      <ActionButton
        label="アップロード"
        onClick={handleUpload}
        disabled={files.length === 0}
        isLoading={isUploading}
        color="green"
      />
    </>
  );
}
