"use client";

import { PhotoDetail } from "@/types/photo";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ActionButton } from "../../ui/ActionButton";
import { Check } from "lucide-react";
import { NavButton } from "../../ui/NavButton";
import { deletePhotosByIds } from "@/lib/api/photo/delete";

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

  // 削除処理
  const handleDeleteSelected = async () => {
    const confirmed = window.confirm("選択した画像を削除しますか？");
    if (!confirmed) return;

    try {
      await deletePhotosByIds(selectedIds);
      const count = selectedIds.length;
      const newPhotos = photos.filter(
        (photo) => !selectedIds.includes(photo.id)
      );
      setPhotos(newPhotos);
      setSelectedIds([]);
      toast.success(`${count}枚の画像を削除しました`);
    } catch {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <>
      {/* 削除ボタン */}
      {selectedIds.length > 0 && (
        <div className="mb-2">
          選択した画像 {selectedIds.length}件
          <div className="flex justify-between w-full mt-2">
            <ActionButton
              label="削除"
              onClick={handleDeleteSelected}
              color="red"
            />
            <NavButton
              href={`/admin/photos/edit/?ids=${selectedIds}`}
              label="編集"
              color="blue"
            />
          </div>
        </div>
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
