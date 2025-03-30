"use client";

import { PhotoDetail } from "@/types/photo";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ActionButton } from "../ui/ActionButton";
import { Check } from "lucide-react";

type Props = {
  photos: PhotoDetail[];
  setPhotos: (photos: PhotoDetail[]) => void;
};

/**
 * 画像一覧グリッド
 */
export const PhotoSelectGrid = ({ photos, setPhotos }: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const count = selectedIds.length;
    setPhotos(photos.filter((photo) => !selectedIds.includes(photo.id)));
    setSelectedIds([]);
    toast.success(`${count}枚の画像を削除しました`);
  };

  return (
    <>
      {/* 削除ボタン */}
      {selectedIds.length > 0 && (
        <ActionButton
          label={`選択した画像を削除（${selectedIds.length}件）`}
          onClick={handleDeleteSelected}
          color="red"
        />
      )}

      {/* グリッド表示 */}
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer border rounded overflow-hidden"
            onClick={() => toggleSelect(photo.id)}
          >
            <Image
              src={photo.imageUrl}
              alt={`photo-${photo.id}`}
              fill
              className="object-cover"
            />
            {/* 選択マーク */}
            {selectedIds.includes(photo.id) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check size={16} className="text-bold" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
