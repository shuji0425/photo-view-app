"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePreviewManager } from "@/hooks/usePreviewManager";
import { ImagePreviewGrid } from "./ImagePreviewGrid";
import { useDropzoneManager } from "@/hooks/useDropzoneManager";

type ImageDropzoneRawProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

/**
 * Exif/GPS保持用（リサイズ・圧縮なし）
 */
export const ImageDropzoneRaw = ({
  files,
  setFiles,
}: ImageDropzoneRawProps) => {
  const previewManager = usePreviewManager(files);
  const { handleRemove } = useDropzoneManager({ files, setFiles });

  // 10枚までに制御
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const limitedFiles = acceptedFiles.slice(0, 10);
      setFiles(limitedFiles);
    },
    [setFiles]
  );

  // ドラッグ＆ドロップ許容とファイル制限
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded cursor-pointer mb-4 text-center ${
        isDragActive ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-gray-600">
        メイン画像など、Exif保持が必要な画像を選択（最大10枚）
      </p>
      {previewManager.mode === "multiple" && (
        <ImagePreviewGrid
          previewUrls={previewManager.previewUrls}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};
