"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { X } from "lucide-react";
import { usePreviewManager } from "@/hooks/usePreviewManager";

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

  const handleRemove = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

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

      {previewManager.mode === "multiple" &&
        previewManager.previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {previewManager.previewUrls.map((src, idx) => (
              <div key={idx} className="relative w-full aspect-square border">
                <Image
                  src={src}
                  alt={`preview-${idx}`}
                  fill
                  className="object-cover rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(idx);
                  }}
                  className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-red-500 hover:text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
