"use client";

import { useParams } from "next/navigation";
import { useTagPhotoSort } from "@/hooks/tag/useTagPhotoSort";
import { ActionButton } from "@/components/ui/ActionButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { SortablePhotoList } from "@/components/tag/SortablePhotoList";
import { updateTagPhotoSortOrder } from "@/lib/api/tag/photoSortUpdate";
import { NavButton } from "@/components/ui/NavButton";

export default function TagPhotoSortPage() {
  const params = useParams();
  const tagId = Number(params?.id);
  const { photos, handleReorder } = useTagPhotoSort(tagId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = photos.map((photo, index) => ({
        photoId: photo.photoId,
        sortOrder: index + 1,
      }));
      // 更新処理
      await updateTagPhotoSortOrder(tagId, payload);
      toast.success("写真の並び順を保存しました");
    } catch {
      toast.error("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">写真の並び順(タグID: {tagId})</h1>

      <SortablePhotoList photos={photos} onReorder={handleReorder} />

      <div className="mt-6 text-right flex justify-between">
        <NavButton label="戻る" color="blue" href="/admin/tags/sort" />
        <ActionButton
          label="保存"
          color="green"
          onClick={handleSave}
          disabled={isSaving}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
}
