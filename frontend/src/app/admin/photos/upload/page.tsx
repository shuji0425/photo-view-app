"use client";

import React, { useState } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { useAuth } from "@/hooks/useAuth";
import { usePhotoUpload } from "@/hooks/photo/usePhotoUpload";
import { ImageDropzoneRaw } from "@/components/dropzone/ImageDropzoneRaw";

/**
 * 画像アップロード画面
 * @returns 遷移とid配列
 */
export default function PhotoUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const { user, isLoading: authLoading } = useAuth();
  const { upload, isUploading, progress } = usePhotoUpload(
    Number(user?.id ?? 0)
  );

  if (authLoading) return <p>読み込み中...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">画像アップロード</h1>

      {/* プログレスバー */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded h-2 mt-4 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <ImageDropzoneRaw files={files} setFiles={setFiles} />

      <ActionButton
        label="アップロード"
        onClick={() => upload(files)}
        disabled={files.length === 0}
        isLoading={isUploading}
        color="green"
      />
    </>
  );
}
