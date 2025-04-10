"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { usePreviewManager } from "@/hooks/usePreviewManager";
import { ImagePreviewGrid } from "./ImagePreviewGrid";
import { useDropzoneManager } from "@/hooks/useDropzoneManager";

type ImageDropzoneProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

/**
 * ドラッグ＆ドロップでファイル追加
 */
export const ImageDropzone = ({ files, setFiles }: ImageDropzoneProps) => {
  const { convertMultiple } = useImageProcessor();
  const previewManager = usePreviewManager(files);
  const { handleRemove } = useDropzoneManager({ files, setFiles });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const limitedFiles = acceptedFiles.slice(0, 10);
      // リサイズ＆圧縮
      const processedFiles = await convertMultiple(limitedFiles);
      setFiles(processedFiles);
    },
    [setFiles, convertMultiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
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
        ここに画像をドラッグ&ドロップ、またはクリックして選択（最大10枚)
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
