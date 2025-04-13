"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  previewUrls: string[];
  onRemove: (index: number) => void;
};

/**
 * プレビューエリア
 */
export const ImagePreviewGrid = ({ previewUrls, onRemove }: Props) => {
  if (previewUrls.length === 0) return null;

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {previewUrls.map((src, idx) => (
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
              onRemove(idx);
            }}
            className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-red-500 hover:text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
