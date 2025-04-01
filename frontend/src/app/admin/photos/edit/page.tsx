"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { usePhotoEditor } from "@/hooks/usePhotoEditor";
import { PhotoEditCard } from "@/components/photo/PhotoEditCard";
import toast from "react-hot-toast";
import { ActionButton } from "@/components/ui/ActionButton";
import { PhotoDetail } from "@/types/photo";
import { photoBulkUpdateSchema } from "@/lib/schema/photoSchema";
import { updatePhotos } from "@/lib/api/photo/bulkUpdate";

/**
 * 編集画面
 */
export default function PhotoEditPage() {
  const searchParams = useSearchParams();
  const ids = useMemo(() => {
    const idsParam = searchParams.get("ids");
    return idsParam ? idsParam.split(",").map(Number) : [];
  }, [searchParams]);

  const { photos, setPhotos, loading } = usePhotoEditor(ids);

  const handleChange = <K extends keyof PhotoDetail>(
    index: number,
    field: K,
    value: PhotoDetail[K]
  ) => {
    setPhotos((prev) =>
      prev.map((photo, i) =>
        i === index ? { ...photo, [field]: value } : photo
      )
    );
  };

  const handleSave = async () => {
    try {
      const validated = photoBulkUpdateSchema.parse({ updates: photos });
      await updatePhotos(validated);
      toast.success("更新が完了しました");
    } catch {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-6">画像の編集</h1>

      {loading && <p className="text-sm text-gray-500">読み込み中...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-sm text-gray-500">編集対象の画像がありません</p>
      )}

      {photos.map((photo, idx) => (
        <PhotoEditCard
          key={photo.id}
          idx={idx}
          photo={photo}
          onChange={(filed, value) => handleChange(idx, filed, value)}
        />
      ))}

      {photos.length > 0 && (
        <ActionButton color="green" label="すべて保存" onClick={handleSave} />
      )}
    </>
  );
}
