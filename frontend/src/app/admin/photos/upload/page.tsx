"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postUploadImages } from "@/lib/api/photo/upload";
import Image from "next/image";
import { ActionButton } from "@/components/ui/ActionButton";
import toast from "react-hot-toast";

/**
 * 画像アップロード画面
 * @returns 遷移とid配列
 */
export default function PhotoUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // プレビュー用の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
      ? Array.from(e.target.files).slice(0, 10)
      : [];
    setFiles(selectedFiles);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  // ファイルをアップロード
  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      const uploadedIds = await postUploadImages(formData);
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

  return (
    <>
      <h1 className="text-xl font-bold mb-4">画像アップロード</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="mb-4"
      />

      <div className="grid grid-cols-3 gap-2 mb-4">
        {previews?.map((src, idx) => (
          <div key={idx} className="relative w-full aspect-square border">
            <Image
              src={src}
              alt="preview"
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>

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
